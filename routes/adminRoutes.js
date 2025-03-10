// Admin API routes
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/profile', authMiddleware.verifyToken, adminController.getProfile);
router.put('/profile', authMiddleware.verifyToken, adminController.updateProfile);

// List drivers (active)
router.get('/drivers', authMiddleware.verifyToken, adminController.getDrivers);
// Unregister (blacklist) a driver
router.delete('/drivers/:id', authMiddleware.verifyToken, adminController.unregisterDriver);
// Get all blacklisted drivers
router.get('/drivers/blacklisted', authMiddleware.verifyToken, adminController.getBlacklistedDrivers);
// Whitelist a driver
router.put('/drivers/:id/whitelist', authMiddleware.verifyToken, adminController.whitelistDriver);

module.exports = router;
