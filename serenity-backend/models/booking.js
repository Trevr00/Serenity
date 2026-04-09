const mongoose = require("mongoose");

const VALID_SERVICES = [
  "Shaving Parlour",
  "Full Body Massage",
  "Mini-Gym",
  "Sauna",
  "Steam Bath",
  "Manicure & Pedicure",
  "Hairstylist",
];

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: { values: VALID_SERVICES, message: "Invalid service selected" },
    },
    packageName: {
      type: String,
      trim: true, // optional package (Refresh / Restore / Renew)
    },
    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    time: {
      type: String,
      required: [true, "Booking time is required"],
      match: [/^\d{2}:\d{2}$/, "Time must be in HH:MM format"],
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: [0, "Amount cannot be negative"],
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid", "failed"],
      default: "unpaid",
    },
    mpesaRef: {
      type: String, // M-Pesa CheckoutRequestID
      trim: true,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
