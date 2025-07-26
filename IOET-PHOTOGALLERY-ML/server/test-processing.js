// Test script to run face recognition processing
// Save this as test-processing.js and run with: node test-processing.js

import { processAllPhotosForFaceRecognition } from "./services/reprocessingService.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const runTest = async () => {
	try {
		console.log("🚀 Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		console.log("🔍 Starting face recognition processing...");
		const results = await processAllPhotosForFaceRecognition();

		console.log("🎉 Processing completed:", results);
	} catch (error) {
		console.error("❌ Error:", error.message);
	} finally {
		await mongoose.disconnect();
		console.log("🔒 Disconnected from MongoDB");
		process.exit(0);
	}
};

runTest();
