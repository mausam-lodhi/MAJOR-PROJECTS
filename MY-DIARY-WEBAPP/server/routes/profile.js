import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

// Get user profile
router.get("/profile", auth, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
	try {
		const { fullname, email, password, bio, location, mobile_number } = req.body;
		const updateFields = { fullname, email, bio, location, mobile_number };

		if (password) {
			updateFields.password = await bcrypt.hash(password, 10);
		}

		const user = await User.findByIdAndUpdate(req.userId, updateFields, { new: true }).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
