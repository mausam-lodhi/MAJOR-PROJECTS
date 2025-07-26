// server/controllers/eventController.js
import axios from "axios";
import EventPhoto from "../models/Image.js";

const uploadEventPhoto = async (req, res) => {
	try {
		const ImageURL = req.file.path;

		// Send image to ML server for matching
		const response = await axios.post(`${process.env.ML_API_URL}/match`, {
			image_url: ImageURL,
		});

		const matchedNames = response.data.matched_names || [];

		// Save to MongoDB
		const photo = new EventPhoto({
			detectedFaces: matchedNames,
		});

		await photo.save();
		res.status(201).json({ message: "Event photo uploaded & matched", matchedNames });
	} catch (error) {
		console.error("Error uploading event photo:", error);
		res.status(500).json({ message: "Server error while uploading event photo" });
	}
};

export { uploadEventPhoto };
