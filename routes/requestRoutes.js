// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/user/request/status?driverId=...
router.get('/status', authMiddleware.verifyToken, requestController.getRequestStatus);

module.exports = router;
