const express = require("express");
const { addVehicle, getVehicles } = require("../controllers/vehicleController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addVehicle);
router.get("/", protect, getVehicles);

module.exports = router;
