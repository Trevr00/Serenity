const User = require("../models/user");
const Booking = require("../models/booking");
const Payment = require("../models/payment");
const AuditLog = require("../models/auditLog");
const SystemSetting = require("../models/systemSetting");

// ── Analytics ─────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/analytics/overview
 * KPI summary: users, bookings, revenue
 */
exports.getOverview = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalUsers,
      newUsersToday,
      newUsersMonth,
      totalBookings,
      bookingsToday,
      bookingsMonth,
      revenueAll,
      revenueToday,
      revenueMonth,
      bookingStatusCounts,
      paymentStatusCounts,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startOfToday } }),
      User.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments(),
      Booking.countDocuments({ createdAt: { $gte: startOfToday } }),
      Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: "$amountPaid" } } }]),
      Booking.aggregate([
        { $match: { createdAt: { $gte: startOfToday } } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
      Booking.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amountPaid" } } },
      ]),
      Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Booking.aggregate([{ $group: { _id: "$paymentStatus", count: { $sum: 1 } } }]),
    ]);

    res.json({
      users: {
        total: totalUsers,
        today: newUsersToday,
        thisMonth: newUsersMonth,
      },
      bookings: {
        total: totalBookings,
        today: bookingsToday,
        thisMonth: bookingsMonth,
        byStatus: Object.fromEntries(bookingStatusCounts.map((s) => [s._id, s.count])),
      },
      revenue: {
        total: revenueAll[0]?.total || 0,
        today: revenueToday[0]?.total || 0,
        thisMonth: revenueMonth[0]?.total || 0,
        byPaymentStatus: Object.fromEntries(paymentStatusCounts.map((s) => [s._id, s.count])),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/analytics/bookings-trend
 * Daily booking + revenue counts for the last N days (default 30)
 */
exports.getBookingsTrend = async (req, res, next) => {
  try {
    const days = Math.min(parseInt(req.query.days) || 30, 90);
    const since = new Date();
    since.setDate(since.getDate() - days);
    since.setHours(0, 0, 0, 0);

    const trend = await Booking.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          bookings: { $sum: 1 },
          revenue: { $sum: "$amountPaid" },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: { year: "$_id.year", month: "$_id.month", day: "$_id.day" },
              },
            },
          },
          bookings: 1,
          revenue: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json({ trend });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/analytics/service-breakdown
 * Bookings & revenue per service
 */
exports.getServiceBreakdown = async (req, res, next) => {
  try {
    const breakdown = await Booking.aggregate([
      {
        $group: {
          _id: "$service",
          bookings: { $sum: 1 },
          revenue: { $sum: "$amountPaid" },
        },
      },
      { $sort: { revenue: -1 } },
    ]);

    res.json({ breakdown: breakdown.map((b) => ({ service: b._id, bookings: b.bookings, revenue: b.revenue })) });
  } catch (err) {
    next(err);
  }
};

// ── User Management ───────────────────────────────────────────────────────────

/**
 * GET /api/admin/users
 * Paginated list with search + filter
 */
exports.getUsers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const { search, role, isActive } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/users/:id/role
 * Update a user's role
 */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(422).json({ error: "Role must be 'user' or 'admin'." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/users/:id/status
 * Suspend or re-activate a user account
 */
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
      return res.status(422).json({ error: "isActive must be a boolean." });
    }

    // Prevent admin from suspending themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot suspend your own account." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/users/:id
 * Permanently delete a user account
 */
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot delete your own account." });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
};

// ── Audit Logs ────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/audit-logs
 * Paginated audit trail
 */
exports.getAuditLogs = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 25, 100);
    const skip = (page - 1) * limit;
    const { resource, action } = req.query;

    const filter = {};
    if (resource) filter.resource = resource;
    if (action) filter.action = action;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate("admin", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AuditLog.countDocuments(filter),
    ]);

    res.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// ── System Settings ───────────────────────────────────────────────────────────

/**
 * GET /api/admin/settings
 * Get all settings, optionally filtered by category
 */
exports.getSettings = async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const settings = await SystemSetting.find(filter).sort({ category: 1, key: 1 });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/settings/:key
 * Upsert a setting by key
 */
exports.upsertSetting = async (req, res, next) => {
  try {
    const { value, description, category, isPublic } = req.body;
    if (value === undefined) return res.status(422).json({ error: "value is required." });

    const setting = await SystemSetting.findOneAndUpdate(
      { key: req.params.key },
      { value, description, category, isPublic, updatedBy: req.user._id },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.json({ setting });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/settings/:key
 * Remove a setting
 */
exports.deleteSetting = async (req, res, next) => {
  try {
    const setting = await SystemSetting.findOneAndDelete({ key: req.params.key });
    if (!setting) return res.status(404).json({ error: "Setting not found." });
    res.json({ message: "Setting deleted." });
  } catch (err) {
    next(err);
  }
};
