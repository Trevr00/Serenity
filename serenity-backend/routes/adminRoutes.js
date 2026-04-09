const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const { auditMiddleware } = require("../middleware/auditLogger");

const admin = require("../controller/adminController");
const pkg = require("../controller/packageController");

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// ── Analytics ─────────────────────────────────────────────────────────────────
router.get("/analytics/overview", admin.getOverview);
router.get("/analytics/bookings-trend", admin.getBookingsTrend);
router.get("/analytics/service-breakdown", admin.getServiceBreakdown);

// ── User Management ───────────────────────────────────────────────────────────
router.get("/users", admin.getUsers);
router.patch(
  "/users/:id/role",
  auditMiddleware("ROLE_CHANGE", "User"),
  admin.updateUserRole
);
router.patch(
  "/users/:id/status",
  auditMiddleware("SUSPEND", "User"),
  admin.updateUserStatus
);
router.delete(
  "/users/:id",
  auditMiddleware("DELETE", "User"),
  admin.deleteUser
);

// ── Packages ──────────────────────────────────────────────────────────────────
router.get("/packages", pkg.getPackages);
router.post(
  "/packages",
  auditMiddleware("CREATE", "Package", () => null),
  pkg.createPackage
);
router.put(
  "/packages/:id",
  auditMiddleware("UPDATE", "Package"),
  pkg.updatePackage
);
router.delete(
  "/packages/:id",
  auditMiddleware("DELETE", "Package"),
  pkg.deletePackage
);
router.patch(
  "/packages/bulk-price",
  auditMiddleware("BULK_UPDATE", "Package", () => null),
  pkg.bulkPriceUpdate
);

// ── System Settings ───────────────────────────────────────────────────────────
router.get("/settings", admin.getSettings);
router.put(
  "/settings/:key",
  auditMiddleware("SETTINGS_UPDATE", "SystemSetting", (req) => req.params.key),
  admin.upsertSetting
);
router.delete(
  "/settings/:key",
  auditMiddleware("DELETE", "SystemSetting", (req) => req.params.key),
  admin.deleteSetting
);

// ── Audit Logs ────────────────────────────────────────────────────────────────
router.get("/audit-logs", admin.getAuditLogs);

module.exports = router;
