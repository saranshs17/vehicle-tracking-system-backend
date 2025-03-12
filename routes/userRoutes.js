// User API routes
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
router.put('/profile', authMiddleware.verifyToken, userController.updateProfile);

// User requesting a driver
router.post('/request', authMiddleware.verifyToken, userController.requestDriver);
// New endpoint to update FCM token.
router.put('/updateToken', authMiddleware.verifyToken, userController.updateToken);
// GET user details by user ID
router.get('/:id', userController.getUserById);

module.exports = router;
