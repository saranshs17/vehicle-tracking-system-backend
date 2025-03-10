// Ride request schema
// models/Request.js
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'boarded', 'reached'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', RequestSchema);
