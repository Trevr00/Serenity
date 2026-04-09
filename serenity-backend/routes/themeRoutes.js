const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const { auditMiddleware } = require("../middleware/auditLogger");
const ctrl = require("../controller/themeController");

// ── Public ────────────────────────────────────────────────────────────────────
router.get("/active", ctrl.getActiveTheme);

// ── Admin ─────────────────────────────────────────────────────────────────────
router.get("/",  protect, adminOnly, ctrl.getThemes);

router.post("/apply",
  protect, adminOnly,
  auditMiddleware("UPDATE", "SystemSetting", () => "active-theme"),
  ctrl.applyTheme
);

router.post("/",
  protect, adminOnly,
  auditMiddleware("CREATE", "SystemSetting", () => null),
  ctrl.createTheme
);

router.put("/:id",
  protect, adminOnly,
  auditMiddleware("UPDATE", "SystemSetting"),
  ctrl.updateTheme
);

router.delete("/:id",
  protect, adminOnly,
  auditMiddleware("DELETE", "SystemSetting"),
  ctrl.deleteTheme
);

module.exports = router;
