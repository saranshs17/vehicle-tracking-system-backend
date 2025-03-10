// Admin schema
// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', AdminSchema);
