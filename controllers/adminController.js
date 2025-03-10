// Admin signup/login, profile, driver management
// controllers/adminController.js
const Admin = require('../models/Admin');
const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, photo } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Email already in use.' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, photo });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found.' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all drivers (excluding blacklisted)
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ isBlacklisted: false });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unregister a driver (mark as blacklisted)
exports.unregisterDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, { isBlacklisted: true }, { new: true });
    res.json({ message: 'Driver unregistered (blacklisted).', driver });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get list of blacklisted drivers
exports.getBlacklistedDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ isBlacklisted: true });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Whitelist a driver (remove from blacklist)
exports.whitelistDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, { isBlacklisted: false }, { new: true });
    res.json({ message: 'Driver whitelisted.', driver });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
