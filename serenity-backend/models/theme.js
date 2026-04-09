const mongoose = require("mongoose");

const colorSchema = {
  primary:    { type: String, required: true },
  secondary:  { type: String, required: true },
  background: { type: String, required: true },
  accent:     { type: String, required: true },
  text:       { type: String, required: true },
};

const themeSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, trim: true },
    slug:      { type: String, required: true, unique: true, lowercase: true },
    colors:    colorSchema,
    isDefault: { type: Boolean, default: false }, // built-in preset
    isCustom:  { type: Boolean, default: false }, // admin-created
    isActive:  { type: Boolean, default: false }, // currently applied
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", themeSchema);
