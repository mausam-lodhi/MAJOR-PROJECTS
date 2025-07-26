// updateAllImages.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";
import Image from "./models/Image.js"; // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

try {
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("✅ Connected to MongoDB");

	const result = await Image.updateMany({ detectedFaces: { $exists: false } }, { $set: { detectedFaces: [] } });

	console.log(`✅ ${result.modifiedCount} documents updated`);

	await mongoose.disconnect();
	console.log("🔌 Disconnected from MongoDB");
} catch (err) {
	console.error("❌ Error:", err.message);
}
