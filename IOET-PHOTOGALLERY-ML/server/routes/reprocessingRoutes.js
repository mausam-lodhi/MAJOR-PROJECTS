// server/routes/reprocessingRoutes.js
import express from "express";
import { reprocessEventPhotosForStudent, processAllPhotosForFaceRecognition, reprocessSpecificPhotos } from "../services/reprocessingService.js";
import Student from "../models/Student.js";
import EventPhoto from "../models/Image.js";

const router = express.Router();

// POST /api/reprocess/student/:studentId
router.post("/student/:studentId", async (req, res) => {
	try {
		const { studentId } = req.params;

		// Verify student exists
		const student = await Student.findById(studentId);
		if (!student) {
			return res.status(404).json({ message: "Student not found" });
		}

		console.log(`🔄 Manual reprocessing triggered for student: ${student.name}`);

		// Trigger reprocessing
		reprocessEventPhotosForStudent(studentId, student.encodingId)
			.then(() => {
				console.log(`🎉 Manual reprocessing completed for ${student.name}`);
			})
			.catch((error) => {
				console.error(`❌ Manual reprocessing failed for ${student.name}:`, error.message);
			});

		res.status(200).json({
			message: `Reprocessing started for ${student.name}`,
			studentId: studentId,
			studentName: student.name,
		});
	} catch (error) {
		console.error("Error triggering manual reprocessing:", error);
		res.status(500).json({ message: "Server error while triggering reprocessing" });
	}
});

// GET /api/reprocess/status/:studentId
router.get("/status/:studentId", async (req, res) => {
	try {
		const { studentId } = req.params;

		const student = await Student.findById(studentId);
		if (!student) {
			return res.status(404).json({ message: "Student not found" });
		}

		res.status(200).json({
			studentId: studentId,
			studentName: student.name,
			matchedPhotosCount: student.matchedPhotos.length,
			matchedPhotos: student.matchedPhotos,
		});
	} catch (error) {
		console.error("Error getting reprocessing status:", error);
		res.status(500).json({ message: "Server error while getting status" });
	}
});

// POST /api/reprocess/all-photos - Process all photos in database for face recognition
router.post("/all-photos", async (req, res) => {
	try {
		console.log(`🚀 Starting batch processing of all photos for face recognition`);

		// Start processing in background
		processAllPhotosForFaceRecognition()
			.then((results) => {
				console.log(`🎉 Batch processing completed:`, results);
			})
			.catch((error) => {
				console.error(`❌ Batch processing failed:`, error.message);
			});

		res.status(200).json({
			message: "Face recognition processing started for all photos in database",
			status: "processing",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error starting batch processing:", error);
		res.status(500).json({ message: "Server error while starting batch processing" });
	}
});

// POST /api/reprocess/specific-photos - Reprocess specific photos by IDs
router.post("/specific-photos", async (req, res) => {
	try {
		const { photoIds } = req.body;

		if (!photoIds || !Array.isArray(photoIds) || photoIds.length === 0) {
			return res.status(400).json({ message: "Please provide an array of photo IDs" });
		}

		console.log(`🔄 Starting reprocessing of ${photoIds.length} specific photos`);

		// Start processing in background
		reprocessSpecificPhotos(photoIds)
			.then((results) => {
				console.log(`🎉 Specific photo reprocessing completed:`, results);
			})
			.catch((error) => {
				console.error(`❌ Specific photo reprocessing failed:`, error.message);
			});

		res.status(200).json({
			message: `Face recognition processing started for ${photoIds.length} photos`,
			photoIds: photoIds,
			status: "processing",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error starting specific photo reprocessing:", error);
		res.status(500).json({ message: "Server error while starting specific photo reprocessing" });
	}
});

// GET /api/reprocess/database-stats - Get database statistics
router.get("/database-stats", async (req, res) => {
	try {
		const totalPhotos = await EventPhoto.countDocuments({});
		const photosWithFaces = await EventPhoto.countDocuments({ detectedFaces: { $ne: [], $exists: true } });
		const photosWithoutFaces = totalPhotos - photosWithFaces;
		const totalStudents = await Student.countDocuments({});

		// Get some sample photos with detected faces
		const samplePhotosWithFaces = await EventPhoto.find({ detectedFaces: { $ne: [], $exists: true } })
			.limit(5)
			.select("_id detectedFaces uploadedTime");

		res.status(200).json({
			totalPhotos,
			photosWithFaces,
			photosWithoutFaces,
			totalStudents,
			processingCoverage: totalPhotos > 0 ? ((photosWithFaces / totalPhotos) * 100).toFixed(2) + "%" : "0%",
			samplePhotosWithFaces,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error getting database stats:", error);
		res.status(500).json({ message: "Server error while getting database stats" });
	}
});

export default router;
