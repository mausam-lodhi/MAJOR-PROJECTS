import express from "express";
import States from "../Models/statesModels.js";
import District from "../Models/districtsModel.js";
import Hospital from "../Models/hospitalModel.js";
const router = express.Router();
router.get("/home/states", async (req, res) => {
	try {
		const states = await States.find();
		res.json(states);
	} catch (error) {
		console.error("Error fetching state data:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/districts/:stateId", async (req, res) => {
	try {
		const { stateId } = req.params;
		const districts = await District.find({ state_id: stateId });
		res.json(districts);
	} catch (error) {
		console.error("Error fetching district data:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/hospitals/:districtId", async (req, res) => {
	try {
		const { districtId } = req.params;
		const hospitals = await Hospital.find({ district_id: districtId });
		res.json(hospitals);
	} catch (error) {
		console.error("Error fetching hospital data:", error);
		res.status(500).send("Internal Server Error");
	}
});
router.get("/hospitals", async (req, res) => {
	try {
		const hospital = await Hospital.find();
		res.json(hospital);
	} catch (error) {
		console.error("Error fetching hospital data:", error);
		res.status(500).send("Internal Server Error");
	}
});
router.get("/hospitals/search/:hospitalName", async (req, res) => {
	try {
		const { hospitalName } = req.params;
		const hospital = await Hospital.find({ hospital_name: hospitalName });
		res.json(hospital);
	} catch (error) {
		console.error("Error fetching hospital data:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/hospitals/search/details/:hospitalName", async (req, res) => {
	const { hospitalName } = req.params; // Corrected variable name
	try {
		const hospital = await Hospital.find({ hospital_name: `${hospitalName}` });
		res.json(hospital);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
});

export default router;
