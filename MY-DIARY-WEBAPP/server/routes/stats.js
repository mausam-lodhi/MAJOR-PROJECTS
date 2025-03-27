import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Entry from "../models/Entry.js";

router.get("/stats", async (req, res) => {
	try {
		const userCount = await User.countDocuments();
		const entryCount = await Entry.countDocuments();

		res.json({
			userCount,
			entryCount,
		});
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
