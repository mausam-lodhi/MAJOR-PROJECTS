import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	rollNo: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: function (v) {
				return /^y\d{9}$/.test(v);
			},
			message: (props) => `${props.value} is not a valid roll number!`,
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: function (v) {
				return /@dhsgsu\.edu\.in$/.test(v);
			},
			message: (props) => `${props.value} is not a valid institutional email!`,
		},
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
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
	likes: {
		type: Number,
		default: 0,
	},
	likedImages: {
		type: [
			{
				imageId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Image",
				},
				imageNumber: Number,
			},
		],
		default: [],
	},
	comments: {
		type: Number,
		default: 0,
	},
	isBanned: {
		type: Boolean,
		default: false,
	},
	isSuperAdmin: {
		type: Boolean,
		default: false,
	},
});

// Add method to check if user is super admin
userSchema.methods.isSuperAdminUser = function() {
	return this.isSuperAdmin;
};

// Add pre-save middleware to handle data before saving
userSchema.pre("save", function (next) {
	if (this.isModified("rollNo")) {
		this.rollNo = this.rollNo.toLowerCase();
	}
	if (this.isModified("email")) {
		this.email = this.email.toLowerCase();
	}
	next();
});

export default mongoose.model("User", userSchema);
