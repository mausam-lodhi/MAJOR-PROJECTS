import mongoose from "mongoose";

// Define Hospital Schema
const hospitalSchema = new mongoose.Schema({
	hospital_id: {
		type: Number,
		required: true,
	},
	hospital_name: {
		type: String,
		required: true,
	},
	district_id: {
		type: String,
		required: true,
	},
	nodal_person_contact_no: {
		type: String,
		required: true,
	},
	nodal_person_email: {
		type: String,
		required: true,
	},
	empaneled_specialities: {
		type: [String], // Array of strings for specialities
		required: true,
	},
});

// Create and Export the Hospital Model
const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
