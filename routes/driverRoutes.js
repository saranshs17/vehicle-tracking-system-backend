// Driver API routes
// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', driverController.signup);
router.post('/login', driverController.login);
router.get('/profile', authMiddleware.verifyToken, driverController.getProfile);
router.put('/profile', authMiddleware.verifyToken, driverController.updateProfile);

// Driver request actions
router.get('/requests', authMiddleware.verifyToken, driverController.getRequests);
router.put('/requests/:id/accept', authMiddleware.verifyToken, driverController.acceptRequest);
router.put('/requests/:id/reject', authMiddleware.verifyToken, driverController.rejectRequest);
router.put('/requests/:id/board', authMiddleware.verifyToken, driverController.boardRequest);
router.put('/requests/:id/reach', authMiddleware.verifyToken, driverController.reachRequest);

module.exports = router;
