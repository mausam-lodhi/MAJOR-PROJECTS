import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Image from "../models/Image.js";
import User from "../models/User.js"; // Add this import
dotenv.config();
const router = express.Router();
import { check, validationResult } from "express-validator";

router.get("/images", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 12;
		const skip = (page - 1) * limit;

		const images = await Image.find().sort({ likes: -1, comments: -1, _id: -1 }).skip(skip).limit(limit); // Updated sorting

		const total = await Image.countDocuments();

		res.json({
			images,
			hasMore: skip + images.length < total,
			total,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Update the get category route
router.get("/images/category/:category", async (req, res) => {
	try {
		const category = req.params.category;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 12;
		const skip = (page - 1) * limit;

		const images = await Image.find({
			category: { $regex: new RegExp(category, "i") },
		})
			.sort({ likes: -1, comments: -1, _id: -1 }) // Updated sorting
			.skip(skip)
			.limit(limit);

		const total = await Image.countDocuments({
			category: { $regex: new RegExp(category, "i") },
		});

		res.json({
			images,
			hasMore: skip + images.length < total,
			total,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

router.get("/images/:_id", async (req, res) => {
	try {
		const image = await Image.findById(req.params._id);
		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}
		// Add this line to ensure likedBy array is included in response
		const populatedImage = await Image.findById(req.params._id).select("+likedBy");
		res.json(populatedImage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

router.delete("/image/:_id", async (req, res) => {
	try {
		await Image.findByIdAndDelete(req.params._id);
		res.json({ message: "Image deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});
router.put("/image/:_id", async (req, res) => {
	try {
		const image = await Image.findByIdAndUpdate(req.params._id, req.body, { new: true });
		res.json(image);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Add this consolidated route for handling likes:
router.put("/image/:_id/like", async (req, res) => {
	try {
		const image = await Image.findById(req.params._id);
		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		const { userId, userRollNo } = req.body;
		if (!userId || !userRollNo) {
			return res.status(400).json({ error: "User ID and Roll Number are required" });
		}

		// Find the user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (req.body.action === "unlike") {
			// Remove like from image
			image.likes = Math.max(0, image.likes - 1);
			image.likedBy = image.likedBy.filter((rollNo) => rollNo !== userRollNo);

			// Remove image from user's likedImages
			user.likedImages = user.likedImages.filter((likedImage) => likedImage.imageId.toString() !== req.params._id);
		} else if (!image.likedBy.includes(userRollNo)) {
			// Add like to image
			image.likes += 1;
			image.likedBy.push(userRollNo);

			// Add image to user's likedImages if not already present
			if (!user.likedImages.some((img) => img.imageId.toString() === req.params._id)) {
				user.likedImages.push({
					imageId: image._id,
				});
			}
		}

		// Save both image and user
		await Promise.all([image.save(), user.save()]);

		// Return both updated image and user's liked images
		res.json({
			image: image,
			userLikedImages: user.likedImages,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Add a new route to get user's liked images
router.get("/user/:userId/liked-images", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).populate("likedImages.imageId");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user.likedImages);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Add a new route to add comments to an image
router.post("/image/:_id/comment", async (req, res) => {
	try {
		const { comment, userId } = req.body;
		if (!comment || !userId) {
			return res.status(400).json({ error: "Comment and User ID are required" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const image = await Image.findById(req.params._id);
		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		image.commentsArray.push({ userRollNo: user.rollNo, comment, createdAt: new Date() });
		image.comments += 1;

		await image.save();
		res.status(201).json(image);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Add a new route to get comments of an image
router.get("/image/:_id/comments", async (req, res) => {
	try {
		const image = await Image.findById(req.params._id);
		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		res.json(image.commentsArray);
	} catch (error) {
		console.error("Error fetching comments:", error); // Add this line
		res.status(500).json({ error: "Server error" });
	}
});

// Add this new route before export default router
router.get("/images/next/:currentId", async (req, res) => {
	try {
		const currentId = req.params.currentId;

		// Find the next image that was uploaded after the current image
		const nextImage = await Image.findOne({
			_id: { $gt: currentId },
		}).sort({ _id: 1 });

		// If no next image found, get the first image (circular navigation)
		if (!nextImage) {
			const firstImage = await Image.findOne().sort({ _id: 1 });
			return res.json(firstImage);
		}

		res.json(nextImage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

// Add this new route before export default router
router.get("/images/previous/:currentId", async (req, res) => {
	try {
		const currentId = req.params.currentId;

		// Find the previous image that was uploaded before the current image
		const previousImage = await Image.findOne({
			_id: { $lt: currentId },
		}).sort({ _id: -1 });

		// If no previous image found, get the last image (circular navigation)
		if (!previousImage) {
			const lastImage = await Image.findOne().sort({ _id: -1 });
			return res.json(lastImage);
		}

		res.json(previousImage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
