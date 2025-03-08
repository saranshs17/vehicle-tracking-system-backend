const Vehicle = require("../models/Vehicle");

const addVehicle = async (req, res) => {
    const { driverId, licensePlate } = req.body;

    try {
        const vehicle = await Vehicle.create({ driverId, licensePlate });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addVehicle, getVehicles };
