// Driver schema
// models/Driver.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    plateNumber: { type: String, required: true },
    photo: { type: String },
    isBlacklisted: { type: Boolean, default: false },
    status: { type: String, enum: ['available', 'busy'], default: 'available' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Driver', DriverSchema);
