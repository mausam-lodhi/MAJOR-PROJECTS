import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
	imageUrl: {
		type: String,
		required: true,
		default: "",
	},
	tags: {
		type: Array,
		required: true,
		default: [],
	},
	category: {
		type: String,
		required: true,
		default: "random",
	},
	likes: {
		type: Number,
		required: true,
		default: 0,
	},
	comments: {
		type: Number,
		required: true,
		default: 0,
	},
	commentsArray: {
		type: [
			{
				userRollNo: {
					type: String,
					required: true,
				},
				comment: String,
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		required: true,
		default: [],
	},
	likedBy: {
		type: [String], // Array of unique identifiers (could be userIds or browser fingerprints)
		default: [],
		required: true,
	},
	uploadedTime: {
		type: Date,
		required: true,
		default: Date.now,
	},
	detectedFaces: {
		type: [String], // Array of student names
		default: [],
	},
});

// Add a method to check if an image is liked
imageSchema.methods.isLikedBy = function (identifier) {
	return this.likedBy.includes(identifier);
};

export default mongoose.model("Image", imageSchema);
