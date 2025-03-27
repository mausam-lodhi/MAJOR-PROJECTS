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
		check("rollNo", "Roll number is required").not().isEmpty(),
		check("email", "Please include a valid email")
			.isEmail()
			.custom((value) => {
				// Restrict to emails ending with @dhsgsu.edu.in
				if (!value.endsWith("@dhsgsu.edu.in")) {
					throw new Error("Only institutional emails ending with @dhsgsu.edu.in are allowed.");
				}
				return true;
			}),
		check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					success: false,
					message: errors.array()[0].msg,
				});
			}

			const { rollNo, email, password } = req.body;

			// Log the received data
			console.log("Registration attempt:", { rollNo, email });

			// Check for existing user
			let existingUser = await User.findOne({
				$or: [{ email: email.toLowerCase() }, { rollNo: rollNo.toLowerCase() }],
			});

			if (existingUser) {
				return res.status(400).json({
					success: false,
					message: existingUser.email === email.toLowerCase() ? "Email already registered" : "Roll number already registered",
				});
			}

			// Create new user
			const hashedPassword = await bcrypt.hash(password, 10);
			const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

			const user = new User({
				rollNo: rollNo.toLowerCase(),
				email: email.toLowerCase(),
				password: hashedPassword,
				verificationToken: verificationCode,
				verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
			});

			// Log the user object before saving
			console.log("User object before save:", user);

			try {
				await SendVerificationCode(user.email, verificationCode);
				await user.save();
				console.log("User saved successfully:", user._id);

				res.status(201).json({
					success: true,
					message: "Registration successful! Please check your email for verification.",
					data: {
						userId: user._id,
						email: user.email,
					},
				});
			} catch (saveError) {
				console.error("Error saving user:", saveError);
				throw saveError;
			}
		} catch (error) {
			console.error("Registration error:", error);
			res.status(500).json({
				success: false,
				message: "Registration failed. Please try again.",
				debug: error.message,
			});
		}
	}
);

// Login user
router.post("/login", [check("rollNo", "Roll number is required").not().isEmpty(), check("password", "Password is required").exists()], async (req, res) => {
	try {
		const { rollNo, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ rollNo });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		// Check if user is banned before password verification
		if (user.isBanned) {
			return res.status(403).json({
				message: "This account has been banned",
				user: { isBanned: true },
			});
		}

		// Check verification status first before checking password
		if (!user.isVerified) {
			return res.status(403).json({
				success: false,
				message: "Please verify your email before logging in",
				isVerified: false,
				requiresVerification: true,
			});
		}

		// Only check password if user is verified
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		// Generate token and proceed with login
		generateTokenAndSetCookie(res, user._id);

		res.json({
			success: true,
			message: "Login successful",
			user: {
				id: user._id,
				rollNo: user.rollNo, // Make sure this is included
				email: user.email,
				isVerified: user.isVerified,
			},
		});
	} catch (error) {
		console.error("Login error:", error.message);
		res.status(500).json({
			success: false,
			message: "Server error",
		});
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
	const { verificationToken, userId } = req.body;

	// Better error handling for missing data
	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "User ID is required",
		});
	}

	if (!verificationToken) {
		return res.status(400).json({
			success: false,
			message: "Verification code is required",
		});
	}

	try {
		// First find the user
		const user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		// Then check the verification token
		if (user.verificationToken !== verificationToken) {
			return res.status(400).json({
				success: false,
				message: "Invalid verification code",
			});
		}

		// Check if token is expired
		if (user.verificationTokenExpiresAt < Date.now()) {
			return res.status(400).json({
				success: false,
				message: "Verification code has expired",
			});
		}

		// Update user verification status
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;

		await user.save();

		res.json({
			success: true,
			message: "Email verified successfully",
		});
	} catch (error) {
		console.error("Verification error:", error);
		res.status(500).json({
			success: false,
			message: "Server error during verification",
		});
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

router.post("/resend-verification", async (req, res) => {
	try {
		const { userId } = req.body;

		if (!userId) {
			return res.status(400).json({
				success: false,
				message: "User ID is required",
			});
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		if (user.isVerified) {
			return res.status(400).json({
				success: false,
				message: "User is already verified",
			});
		}

		// Generate new verification code
		const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

		// Update user with new verification code
		user.verificationToken = verificationCode;
		user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
		await user.save();

		// Send new verification code
		await SendVerificationCode(user.email, verificationCode);

		res.json({
			success: true,
			message: "New verification code sent successfully",
		});
	} catch (error) {
		console.error("Resend verification error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to resend verification code",
		});
	}
});

export default router;
