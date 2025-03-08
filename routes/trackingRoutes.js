const express = require("express");
const { updateLocation, getVehicleLocation } = require("../controllers/trackingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, updateLocation);
router.get("/:vehicleId", protect, getVehicleLocation);

module.exports = router;
