import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
	district_id: {
		type: String,
		required: true,
	},
	district_name: {
		type: String,
		required: true,
	},
	state_id: {
		type: String,
		required: true,
	},
});

const District = mongoose.model("District", districtSchema);
export default District;
