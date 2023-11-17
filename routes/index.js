const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const tourRoutes = require("./tourRoutes");
const reviewRoutes = require("./reviewRoutes");
const bookingRoutes = require("./bookingRoutes");

router.use("/auth",authRoutes);
router.use("/tour",tourRoutes);
router.use("/review",reviewRoutes);
router.use('/booking',bookingRoutes)


module.exports = router;