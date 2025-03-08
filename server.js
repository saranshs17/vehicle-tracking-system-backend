require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const trackingRoutes = require("./routes/trackingRoutes");

const app = express();
app.use(cors());
app.use(express.json());  

// Connect MongoDB
connectDB();

app.get("/", (req, res) => res.send("🚀 Vehicle Tracking Backend Running"));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/tracking", trackingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
