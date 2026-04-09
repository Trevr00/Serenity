const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: [200, "Tagline cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    billingCycle: {
      type: String,
      enum: ["once", "monthly", "yearly"],
      default: "once",
    },
    duration: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    priceHistory: [priceHistorySchema],
  },
  { timestamps: true }
);

// Auto-generate slug from name if not provided
packageSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  next();
});

module.exports = mongoose.model("Package", packageSchema);
