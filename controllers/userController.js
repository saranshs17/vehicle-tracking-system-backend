// User signup/login, profile, and driver request
// controllers/userController.js
const User = require('../models/User');
const Request = require('../models/Request');
const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, phone, photo } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use.' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, photo });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found.' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request a driver
exports.requestDriver = async (req, res) => {
  const { driverId } = req.body;
  try {
    // Verify the driver exists and is available (not blacklisted)
    const driver = await Driver.findById(driverId);
    if (!driver || driver.isBlacklisted) {
      return res.status(400).json({ message: 'Driver not available.' });
    }
    const request = new Request({ user: req.user.id, driver: driverId });
    await request.save();
    // You can integrate push notifications or Firebase triggers here as needed.
    res.status(201).json({ message: 'Driver requested.', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateToken = async (req, res) => {
  const { token } = req.body; // The new FCM token coming from the client app.
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { fcmToken: token }, { new: true });
    res.json({ message: "FCM token updated successfully.", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
