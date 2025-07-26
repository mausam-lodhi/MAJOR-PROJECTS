// server/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		ImageUrl: {
			type: String,
			required: true,
		},
		encodingId: {
			type: String,
			required: true,
		},
		matchedPhotos: {
			type: [String], // Array of EventPhoto IDs where this student appears
			default: [],
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Student", studentSchema);
