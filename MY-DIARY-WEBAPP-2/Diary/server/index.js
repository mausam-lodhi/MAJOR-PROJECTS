const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/entries"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/stats"));

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something broke!" });
});

// Environment variables
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
