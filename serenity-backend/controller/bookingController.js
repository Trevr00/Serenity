const Booking = require("../models/booking");

/**
 * POST /api/bookings
 * Create a new booking for the authenticated user
 */
exports.createBooking = async (req, res, next) => {
  try {
    const { service, packageName, date, time, notes, amount } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      service,
      packageName: packageName || undefined,
      date,
      time,
      notes: notes || undefined,
      amountPaid: amount || 0,
    });

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/bookings/my
 * Get all bookings for the authenticated user
 */
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/bookings/:id
 * Get a single booking by ID (user must own it, or be admin)
 */
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    const isOwner = booking.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Access denied." });
    }

    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/bookings/:id/cancel
 * Cancel a pending booking (owner or admin)
 */
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    const isOwner = booking.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Access denied." });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled." });
    }

    if (booking.status === "completed") {
      return res.status(400).json({ error: "Cannot cancel a completed booking." });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully.", booking });
  } catch (err) {
    next(err);
  }
};

// ── Admin-only ─────────────────────────────────────────────────────────────────

/**
 * GET /api/bookings
 * Admin: list all bookings with optional filters
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, service, date } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (service) filter.service = service;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const bookings = await Booking.find(filter)
      .populate("user", "name email phone")
      .sort({ date: -1 });

    res.json({ count: bookings.length, bookings });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/bookings/:id/status
 * Admin: update booking status
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "cancelled", "completed"];

    if (!allowed.includes(status)) {
      return res.status(422).json({ error: `Status must be one of: ${allowed.join(", ")}` });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found." });

    res.json({ booking });
  } catch (err) {
    next(err);
  }
};
