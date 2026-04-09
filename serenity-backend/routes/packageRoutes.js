const express = require("express");
const router = express.Router();
const { getPublicPackages } = require("../controller/packageController");

// Public — no auth required
router.get("/", getPublicPackages);

module.exports = router;
