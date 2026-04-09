const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const mpesaRoutes = require("./routes/mpesaRoutes");
const adminRoutes = require("./routes/adminRoutes");
const packageRoutes = require("./routes/packageRoutes");
const themeRoutes = require("./routes/themeRoutes");
const SystemSetting = require("./models/systemSetting");

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      // In development, allow any localhost origin regardless of port
      if (process.env.NODE_ENV !== "production" && origin.match(/^https?:\/\/localhost(:\d+)?$/)) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // guard against large payloads

// ── Global rate limiter ───────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => res.json({ status: "Serenity backend is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/themes", themeRoutes);

// Public site settings — returns only settings marked isPublic: true
app.get("/api/settings/public", async (_req, res, next) => {
  try {
    const settings = await SystemSetting.find({ isPublic: true }).select("key value -_id");
    const obj = {};
    settings.forEach((s) => { obj[s.key] = s.value; });
    res.json({ settings: obj });
  } catch (err) {
    next(err);
  }
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  // Never leak internal details in production
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "Internal server error"
      : err.message || "Internal server error";
  res.status(status).json({ error: message });
});

module.exports = app;
