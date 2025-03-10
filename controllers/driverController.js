// Driver signup/login, profile, and request actions
// controllers/driverController.js
const Driver = require('../models/Driver');
const Request = require('../models/Request');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, phone, plateNumber, photo } = req.body;
  try {
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) return res.status(400).json({ message: 'Email already in use.' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const driver = new Driver({ name, email, password: hashedPassword, phone, plateNumber, photo });
    await driver.save();
    res.status(201).json({ message: 'Driver registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(400).json({ message: 'Driver not found.' });
    
    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
    
    if (driver.isBlacklisted) return res.status(403).json({ message: 'Driver is blacklisted.' });
    
    const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id).select('-password');
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.json(updatedDriver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get requests assigned to the driver
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ driver: req.user.id })
      .populate('user', 'name phone email photo');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status: 'accepted' },
      { new: true }
    );
    res.json({ message: 'Request accepted', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status: 'rejected' },
      { new: true }
    );
    res.json({ message: 'Request rejected', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.boardRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status: 'boarded' },
      { new: true }
    );
    res.json({ message: 'User boarded', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reachRequest = async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.id },
      { status: 'reached' },
      { new: true }
    );
    res.json({ message: 'Destination reached', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
