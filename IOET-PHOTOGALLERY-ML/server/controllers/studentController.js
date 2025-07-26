// server/controllers/studentController.js
import axios from "axios";
import Student from "../models/Student.js";
import { reprocessEventPhotosForStudent } from "../services/reprocessingService.js";

const uploadStudentPhoto = async (req, res) => {
	try {
		const { name } = req.body;
		const ImageUrl = req.file.path;

		console.log(`📤 Processing student upload: ${name}`);

		// Send image to ML server for encoding
		const response = await axios.post(`${process.env.ML_API_URL}/encode`, {
			name,
			image_url: ImageUrl,
		});

		const encodingId = response.data.encoding_id;

		// Save to MongoDB
		const student = new Student({
			name,
			ImageUrl,
			encodingId,
			matchedPhotos: [], // Initialize empty array
		});

		const savedStudent = await student.save();
		console.log(`✅ Student saved with ID: ${savedStudent._id}`);

		// Trigger reprocessing of existing event photos (async, don't wait)
		console.log(`🔄 Triggering reprocessing for student: ${name}`);
		reprocessEventPhotosForStudent(savedStudent._id, encodingId)
			.then(() => {
				console.log(`🎉 Reprocessing completed for ${name}`);
			})
			.catch((error) => {
				console.error(`❌ Reprocessing failed for ${name}:`, error.message);
			});

		res.status(201).json({
			message: "Student uploaded & encoded successfully. Reprocessing existing photos in background.",
			studentId: savedStudent._id,
			name: name,
		});
	} catch (error) {
		console.error("Error uploading student photo:", error);
		res.status(500).json({ message: "Server error while uploading student photo" });
	}
};

export { uploadStudentPhoto };
