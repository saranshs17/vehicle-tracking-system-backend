// controllers/requestController.js
const Request = require('../models/Request');

exports.getRequestStatus = async (req, res) => {
  try {
    // Get the driver's id from the query string
    const driverId = req.query.driverId;
    // Get the logged-in user's id from req.user (set by your auth middleware)
    const userId = req.user.id;
    
    // Find the request for this user and driver
    const request = await Request.findOne({ user: userId, driver: driverId });
    if (!request) {
      return res.status(404).json({ message: "No request found for this driver" });
    }
    // Return just the status
    res.json({ status: request.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
