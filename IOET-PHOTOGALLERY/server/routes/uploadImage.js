import multer from "multer";
import express from "express";
import Image from "../models/Image.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs"; // Import fs module
dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/image/upload", upload.single("image"), async (req, res) => {
	const jsonData = JSON.parse(req.body.data);

	const { category, tags } = jsonData;
	const file = req.file;

	if (!file) {
		return res.status(400).json({ error: "Please upload an image" });
	}
	const result = await cloudinary.uploader.upload(file.path);
	const imageUrl = result.secure_url;

	// Delete the file from the server
	fs.unlinkSync(file.path);

	try {
		if (!imageUrl) {
			return res.status(400).json({ error: " ImageUrl are required" });
		}

		const image = new Image({
			imageUrl,
			tags,
			category: category || "random",
		});
		const savedImage = await image.save();

		if (savedImage) {
			res.status(201).json(savedImage);
		} else {
			res.status(400).json({ error: "Image not saved" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

//now for multiple images
router.post("/images/upload/multiple", upload.array("images", 1000), async (req, res) => {
	try {
		const jsonData = JSON.parse(req.body.data);
		const { category, tags } = jsonData;
		const files = req.files;

		if (!files || files.length === 0) {
			return res.status(400).json({ error: "Please upload images" });
		}

		const imagesUploaded = await Promise.all(
			files.map(async (file) => {
				const result = await cloudinary.uploader.upload(file.path);
				// Delete the file from the server
				fs.unlinkSync(file.path);
				return {
					imageUrl: result.secure_url,
					tags,
					category: category || "random",
				};
			})
		);

		const savedImages = await Image.insertMany(imagesUploaded);
		res.status(201).json(savedImages);
	} catch (error) {
		console.error("Error during image upload:", error);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
