import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Entry from "../models/Entry.js";

// Create new entry
router.post("/entries", auth, async (req, res) => {
	try {
		const { title, description, date } = req.body;
		const entry = new Entry({
			userId: req.userId,
			title,
			description,
			date: new Date(date),
		});

		await entry.save();
		res.status(201).json(entry);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

// Get user's entries
router.get("/entries", auth, async (req, res) => {
	try {
		const entries = await Entry.find({ userId: req.userId }).sort({ date: -1 });
		res.json(entries);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});
router.get("/entries/:id", auth, async (req, res) => {
	try {
		const entry = await Entry.findOne({ _id: req.params.id });

		if (!entry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		res.json(entry);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

// Update entry
router.put("/entries/:id", auth, async (req, res) => {
	try {
		const { title, description, date } = req.body;
		const entry = await Entry.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { title, description, date }, { new: true });

		if (!entry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		res.json(entry);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

// Delete entry
router.delete("/entries/:id", auth, async (req, res) => {
	try {
		const entry = await Entry.findOneAndDelete({
			_id: req.params.id,
			userId: req.userId,
		});

		if (!entry) {
			return res.status(404).json({ error: "Entry not found" });
		}

		res.json({ message: "Entry deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
