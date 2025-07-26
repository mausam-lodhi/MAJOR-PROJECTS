import mongoose from "mongoose";
import Student from "./models/Student.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function encodeAllStudents() {
	try {
		console.log("🚀 Starting student encoding process...");

		// Connect to MongoDB
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("✅ Connected to MongoDB");

		// Get all students
		const students = await Student.find({});
		console.log(`👥 Found ${students.length} students to encode`);

		const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";
		let encoded = 0;
		let errors = 0;

		for (const student of students) {
			try {
				console.log(`🔍 Encoding student: ${student.name}`);
				console.log(`📸 Image URL: ${student.ImageUrl}`);

				// Send to ML server for encoding
				const response = await axios.post(`${ML_API_URL}/encode`, {
					name: student.name,
					image_url: student.ImageUrl,
				});

				console.log(`✅ Successfully encoded ${student.name}`);
				console.log(`🆔 Encoding ID: ${response.data.encoding_id}`);

				// Update student with encoding ID
				await Student.findByIdAndUpdate(student._id, {
					encodingId: response.data.encoding_id,
				});

				encoded++;

				// Add delay between requests
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (error) {
				errors++;
				console.error(`❌ Error encoding student ${student.name}:`, error.message);
				if (error.response && error.response.data) {
					console.error(`Error details:`, error.response.data);
				}
			}
		}

		console.log(`🎉 Encoding completed!`);
		console.log(`📊 Results: ${encoded} encoded, ${errors} errors`);

		// Verify encodings in ML server
		console.log(`🔍 Verifying stored encodings...`);
		const debugResponse = await axios.get(`${ML_API_URL}/debug/encodings`);
		console.log(`📋 Stored encodings:`, debugResponse.data);
	} catch (error) {
		console.error("❌ Error in encoding process:", error.message);
	} finally {
		await mongoose.disconnect();
		console.log("🔒 Disconnected from MongoDB");
		process.exit(0);
	}
}

encodeAllStudents();
