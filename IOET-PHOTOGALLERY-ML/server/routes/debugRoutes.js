// server/routes/debugRoutes.js
import express from "express";
import Student from "../models/Student.js";
import EventPhoto from "../models/Image.js";

const router = express.Router();

// GET /api/debug/photos - Get all photos with their detected faces
router.get("/photos", async (req, res) => {
	try {
		const photos = await EventPhoto.find({}).select("eventName detectedFaces createdAt");
		res.status(200).json({
			count: photos.length,
			photos: photos,
		});
	} catch (error) {
		console.error("Error getting debug photos:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// GET /api/debug/students - Get all students
router.get("/students", async (req, res) => {
	try {
		const students = await Student.find({}).select("name encodingId createdAt");
		res.status(200).json({
			count: students.length,
			students: students,
		});
	} catch (error) {
		console.error("Error getting debug students:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// GET /api/debug/search-test/:name - Test enhanced search
router.get("/search-test/:name", async (req, res) => {
	try {
		const { getStudentAppearances } = await import("../services/reprocessingService.js");
		const studentName = req.params.name;

		console.log(`🧪 Debug search test for: "${studentName}"`);

		const photos = await getStudentAppearances(studentName);

		res.status(200).json({
			searchTerm: studentName,
			resultsFound: photos.length,
			photos: photos,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error in debug search test:", error);
		res.status(500).json({ message: "Debug search test failed", error: error.message });
	}
});

// GET /api/debug/ml-server-test - Test ML server connectivity
router.get("/ml-server-test", async (req, res) => {
	try {
		const axios = (await import("axios")).default;
		const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";

		console.log(`🧪 Testing ML server connectivity at: ${ML_API_URL}`);

		// Test basic connectivity
		const healthResponse = await axios.get(`${ML_API_URL}/health`, { timeout: 5000 });

		res.status(200).json({
			message: "ML server connectivity test successful",
			mlServerUrl: ML_API_URL,
			healthResponse: healthResponse.data,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("ML server test failed:", error.message);
		res.status(500).json({
			message: "ML server connectivity test failed",
			error: error.message,
			mlServerUrl: process.env.ML_API_URL || "http://localhost:5001",
			timestamp: new Date().toISOString(),
		});
	}
});

// POST /api/debug/test-face-recognition - Test face recognition with a sample image
router.post("/test-face-recognition", async (req, res) => {
	try {
		const { imageUrl } = req.body;

		if (!imageUrl) {
			return res.status(400).json({ message: "Please provide an imageUrl" });
		}

		const axios = (await import("axios")).default;
		const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";

		console.log(`🧪 Testing face recognition for image: ${imageUrl}`);

		// Try different possible endpoints
		const possibleEndpoints = ["/recognize", "/match", "/detect-faces", "/process"];

		let successResult = null;
		let lastError = null;

		for (const endpoint of possibleEndpoints) {
			try {
				console.log(`🔍 Trying endpoint: ${ML_API_URL}${endpoint}`);

				const response = await axios.post(
					`${ML_API_URL}${endpoint}`,
					{
						image_url: imageUrl,
						ImageUrl: imageUrl, // Some endpoints might expect this
					},
					{ timeout: 30000 }
				);

				successResult = {
					endpoint: endpoint,
					response: response.data,
				};
				break;
			} catch (endpointError) {
				lastError = endpointError;
				console.log(`❌ Endpoint ${endpoint} failed: ${endpointError.message}`);
			}
		}

		if (successResult) {
			res.status(200).json({
				message: "Face recognition test successful",
				workingEndpoint: successResult.endpoint,
				result: successResult.response,
				imageUrl: imageUrl,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.status(500).json({
				message: "All face recognition endpoints failed",
				testedEndpoints: possibleEndpoints,
				lastError: lastError?.message,
				imageUrl: imageUrl,
				timestamp: new Date().toISOString(),
			});
		}
	} catch (error) {
		console.error("Face recognition test failed:", error.message);
		res.status(500).json({
			message: "Face recognition test failed",
			error: error.message,
			timestamp: new Date().toISOString(),
		});
	}
});

export default router;
