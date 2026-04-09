const express = require("express");
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controller/bookingController");
const { protect, adminOnly } = require("../middleware/auth");
const { validate, bookingSchema } = require("../middleware/validate");

const router = express.Router();

// All booking routes require authentication
router.use(protect);

// User routes
router.post("/", validate(bookingSchema), createBooking);
router.get("/my", getMyBookings);
router.get("/:id", getBookingById);
router.patch("/:id/cancel", cancelBooking);

// Admin-only routes
router.get("/", adminOnly, getAllBookings);
router.patch("/:id/status", adminOnly, updateBookingStatus);

module.exports = router;
