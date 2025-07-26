import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import imageRoutes from "./routes/ImageRoutes.js";
import cloudinary from "cloudinary";
import UploadImage from "./routes/uploadImage.js";
import contactRoutes from "./routes/contactRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import reprocessingRoutes from "./routes/reprocessingRoutes.js";
import debugRoutes from "./routes/debugRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Initialize express app
const app = express();

// Update MongoDB connection
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// Add connection error handler
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		// Add disconnection handler
		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

// Connect to MongoDB
connectDB();

// Update CORS configuration
const allowedOrigins = [
	"http://localhost:5173",
	// add any other origins you need
];

// Middleware
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin (like mobile apps, curl, etc.)
			if (!origin) return callback(null, true);

			if (allowedOrigins.indexOf(origin) === -1) {
				const msg = "The CORS policy for this site does not allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/src", express.static(path.join(__dirname, "src")));

// Routes
app.use("/", authRoutes); // or app.use("/api", authRoutes) if you prefer a prefix
app.use("/", imageRoutes); // This means /images/upload will be the full path
app.use("/", UploadImage); // This means /images/upload will be the full path
app.use("/", contactRoutes); // Add this line

app.use("/api/students", studentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/reprocess", reprocessingRoutes);
app.use("/api/debug", debugRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something broke!" });
});

// Add CORS error handling
app.use((err, req, res, next) => {
	if (err.message.includes("CORS")) {
		res.status(403).json({
			error: "CORS Error",
			message: err.message,
		});
	} else {
		next(err);
	}
});

// Environment variables
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
