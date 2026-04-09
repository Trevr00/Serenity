const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // M-Pesa Daraja identifiers
    merchantRequestId: { type: String, trim: true },
    checkoutRequestId: { type: String, trim: true, index: true },
    mpesaReceiptNumber: { type: String, trim: true }, // populated on success
    // Amount in KES
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be at least 1 KES"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["initiated", "pending", "success", "failed", "cancelled"],
      default: "initiated",
    },
    resultCode: { type: Number },      // 0 = success from M-Pesa
    resultDesc: { type: String, trim: true },
    transactionDate: { type: String }, // as returned by M-Pesa (YYYYMMDDHHMMSS)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
