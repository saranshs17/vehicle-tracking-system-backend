const Tracking = require("../models/Tracking");

const updateLocation = async (req, res) => {
    const { vehicleId, latitude, longitude, speed } = req.body;

    try {
        const trackingData = await Tracking.create({ vehicleId, latitude, longitude, speed });
        res.status(201).json(trackingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVehicleLocation = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const trackingData = await Tracking.findOne({ vehicleId }).sort({ createdAt: -1 });
        res.json(trackingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateLocation, getVehicleLocation };
