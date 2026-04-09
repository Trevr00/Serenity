const express = require("express");
const {
  initiateSTKPush,
  mpesaCallback,
  queryPaymentStatus,
} = require("../controller/mpesaController");
const { protect } = require("../middleware/auth");
const { validate, mpesaInitSchema } = require("../middleware/validate");

const router = express.Router();

// Initiate payment (user must be logged in)
router.post("/stkpush", protect, validate(mpesaInitSchema), initiateSTKPush);

// Safaricom callback — no auth (it comes from Safaricom servers)
router.post("/callback", mpesaCallback);

// Poll payment status
router.get("/status/:checkoutRequestId", protect, queryPaymentStatus);

module.exports = router;
