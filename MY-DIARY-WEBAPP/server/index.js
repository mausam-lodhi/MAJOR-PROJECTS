import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/", (await import("./routes/entries.js")).default);
app.use("/", (await import("./routes/profile.js")).default);
app.use("/", (await import("./routes/stats.js")).default);

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
