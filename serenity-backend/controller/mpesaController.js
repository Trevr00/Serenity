const axios = require("axios");
const Booking = require("../models/booking");
const Payment = require("../models/payment");

// ── M-Pesa Daraja helpers ─────────────────────────────────────────────────────

/**
 * Normalise a Kenyan phone number to the 2547XXXXXXXX format
 * accepted by the Daraja STK Push API.
 */
const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  return digits; // already 254…
};

/**
 * Fetch an OAuth access token from Daraja.
 * Token is valid for 3600 seconds; for production consider caching it.
 */
const getAccessToken = async () => {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;
  const credentials = Buffer.from(
    `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const { data } = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  return data.access_token;
};

/**
 * Build the Base64 password required by the STK Push endpoint.
 * Format: Base64(ShortCode + Passkey + Timestamp)
 */
const buildPassword = (timestamp) => {
  const { MPESA_SHORT_CODE, MPESA_PASSKEY } = process.env;
  return Buffer.from(`${MPESA_SHORT_CODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");
};

const getTimestamp = () => {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  );
};

// ── Controller functions ──────────────────────────────────────────────────────

/**
 * POST /api/mpesa/stkpush
 * Initiates an M-Pesa STK Push (Lipa na M-Pesa Online)
 */
exports.initiateSTKPush = async (req, res, next) => {
  try {
    const { bookingId, phone, amount } = req.body;

    // Verify the booking belongs to this user and is payable
    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ error: "This booking has already been paid." });
    }

    const { MPESA_SHORT_CODE, CALLBACK_URL } = process.env;
    const formattedPhone = formatPhone(phone);
    const timestamp = getTimestamp();
    const password = buildPassword(timestamp);

    const accessToken = await getAccessToken();

    const payload = {
      BusinessShortCode: MPESA_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: `${CALLBACK_URL}/api/mpesa/callback`,
      AccountReference: `SERENITY-${bookingId}`,
      TransactionDesc: `Serenity booking payment for ${booking.service}`,
    };

    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // Persist the initiated payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      merchantRequestId: data.MerchantRequestID,
      checkoutRequestId: data.CheckoutRequestID,
      amount,
      phone: formattedPhone,
      status: "pending",
    });

    // Update booking payment status
    booking.paymentStatus = "pending";
    booking.mpesaRef = data.CheckoutRequestID;
    await booking.save();

    res.json({
      message: "STK Push sent. Please check your phone to complete payment.",
      checkoutRequestId: data.CheckoutRequestID,
      paymentId: payment._id,
    });
  } catch (err) {
    // Surface Daraja API errors clearly without leaking internals
    if (err.response?.data) {
      return res
        .status(502)
        .json({ error: "M-Pesa service error. Please try again.", details: err.response.data });
    }
    next(err);
  }
};

/**
 * POST /api/mpesa/callback
 * Receives the async callback from Safaricom after the user completes or cancels payment.
 * This URL must be publicly accessible (use ngrok in development).
 */
exports.mpesaCallback = async (req, res) => {
  // Acknowledge receipt immediately — Safaricom retries if we don't respond fast
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });

  try {
    const body = req.body?.Body?.stkCallback;
    if (!body) return;

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = body;

    const payment = await Payment.findOne({ checkoutRequestId: CheckoutRequestID });
    if (!payment) return;

    payment.resultCode = ResultCode;
    payment.resultDesc = ResultDesc;

    if (ResultCode === 0) {
      // Successful payment — extract metadata
      const meta = {};
      CallbackMetadata?.Item?.forEach(({ Name, Value }) => {
        meta[Name] = Value;
      });

      payment.mpesaReceiptNumber = meta.MpesaReceiptNumber;
      payment.transactionDate = String(meta.TransactionDate);
      payment.status = "success";

      // Mark the linked booking as paid
      await Booking.findByIdAndUpdate(payment.booking, {
        paymentStatus: "paid",
        amountPaid: meta.Amount,
        status: "confirmed",
      });
    } else {
      payment.status = "failed";
      await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: "failed" });
    }

    await payment.save();
  } catch (err) {
    console.error("M-Pesa callback processing error:", err.message);
  }
};

/**
 * GET /api/mpesa/status/:checkoutRequestId
 * Query the status of an STK Push transaction (for polling from the frontend)
 */
exports.queryPaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      checkoutRequestId: req.params.checkoutRequestId,
      user: req.user._id,
    }).populate("booking", "service date status");

    if (!payment) {
      return res.status(404).json({ error: "Payment record not found." });
    }

    res.json({ payment });
  } catch (err) {
    next(err);
  }
};
