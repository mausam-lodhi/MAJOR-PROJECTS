import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("Entry", entrySchema);
