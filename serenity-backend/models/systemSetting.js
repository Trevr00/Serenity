const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Setting key is required"],
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Setting value is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["general", "payment", "notifications", "security", "features"],
      default: "general",
    },
    isPublic: {
      type: Boolean,
      default: false, // if true, frontend can read it without auth
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

systemSettingSchema.index({ category: 1 });
systemSettingSchema.index({ key: 1 });

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
