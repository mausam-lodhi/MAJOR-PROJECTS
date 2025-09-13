// exportData.js
import mongoose from "mongoose";
import fs from "fs";

// Replace with your actual MongoDB connection URI
const MONGO_URI =
	"url";

// Replace with your actual schema
const imageSchema = new mongoose.Schema({}, { strict: false }); // Allow all fields
const Image = mongoose.model("Image", imageSchema, "images"); // (modelName, schema, collectionName)

async function exportToJson() {
	try {
		// Connect to MongoDB
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("✅ Connected to MongoDB");

		// Fetch all documents from the collection
		const data = await Image.find();

		// Write to a JSON file
		fs.writeFileSync("images.json", JSON.stringify(data, null, 2));

		console.log("📦 Data successfully written to images.json");

		// Disconnect
		await mongoose.disconnect();
	} catch (error) {
		console.error("❌ Error exporting data:", error);
	}
}

exportToJson();
