const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login, getMe } = require("../controller/authController");
const { protect } = require("../middleware/auth");
const { validate, registerSchema, loginSchema } = require("../middleware/validate");

const router = express.Router();

// Stricter rate limit for auth endpoints (prevent brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts, please try again in 15 minutes." },
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", protect, getMe);

module.exports = router;
