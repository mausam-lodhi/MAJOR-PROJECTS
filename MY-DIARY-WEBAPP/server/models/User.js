import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	bio: {
		type: String,
		default: "",
		required: true,
	},
	location: {
		type: String,
		default: "",
		required: true,
	},
	mobile_number: {
		type: String,
		default: "",
		required: true,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpiresAt: {
		type: Date,
	},
	verificationToken: {
		type: String,
	},
	verificationTokenExpiresAt: {
		type: Date,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model("User", userSchema);
