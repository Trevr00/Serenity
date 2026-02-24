const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Test route
app.get("/", (req, res) => {
  res.send("Serenity Backend is running!");
});

module.exports = app;

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
