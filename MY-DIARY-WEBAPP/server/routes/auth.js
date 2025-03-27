import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { SendVerificationCode, SendWelcomeMail } from "../nodemail/shareEmails.js";
// Register user
router.post(
	"/register",
	[
		check("fullname", "Full name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { fullname, email, password, bio, location, mobile_number } = req.body;
			// Check if user already exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ error: "User already exists" });
			}

			// Hash password
			const hashedPassword = await bcrypt.hash(password, 10);
			const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
			// Create new user
			user = new User({
				fullname,
				email,
				password: hashedPassword,
				bio,
				location,
				mobile_number,
				verificationToken: verificationCode,
				verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
			});

			try {
				SendVerificationCode(user.email, user.verificationToken);
			} catch (error) {
				console.error(error.message);
			}

			generateTokenAndSetCookie(res, user._id);
			user.save();
			res.status(201).json({
				success: true,
				message: "User registered successfully",
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ error: "Server error" });
		}
	}
);

// Login user
router.post("/login", [check("email", "Please include a valid email").isEmail(), check("password", "Password is required").exists()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Validate password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

		res.json({
			token,
			tokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // Frontend can use this
			user: {
				id: user._id,
				fullname: user.fullname,
				email: user.email,
				bio: user.bio,
				location: user.location,
				mobile_number: user.mobile_number,
			},
		});
	} catch (error) {
		console.error("Login error:", error.message); // Add this line to log the error message
		res.status(500).json({ error: "Server error" });
	}
});

// Validate token
router.get("/validate-token", async (req, res) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(401).json({ error: "Invalid token" });
		}
		res.json({ message: "Token is valid" });
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ error: "Token expired" });
		}
		res.status(401).json({ error: "Invalid token" });
	}
});
router.post("/verify-email", async (req, res) => {
	const { verificationToken } = req.body;
	const user = await User.findOne({ verificationToken });

	try {
		if (!user) {
			return res.status(400).json({ error: "Invalid token" });
		}
		if (user.verificationTokenExpiresAt < Date.now()) {
			return res.status(400).json({ error: "Token expired" });
		}
		user.isVerified = true;
		user.verificationToken = undefined;

		await user.save();
		res.json({ message: "Email verified successfully" });
		SendWelcomeMail(user.email, user.fullname);
	} catch (error) {
		console.error("Server error:", error.message); // Add this line to log server error
		res.status(500).json({ error: "Server error" });
	}
});

router.post("/logout", async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json({ message: "User logged out" });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
