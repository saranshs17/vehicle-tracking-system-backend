const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plateNumber: String,
    currentLocation: {
        lat: Number,
        lng: Number
    },
    speed: Number
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
