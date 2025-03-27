import mongoose from "mongoose";
const Schema = mongoose.Schema({
	state_id: {
		type: String,
		required: true,
		unique: true,
	},
	state_name: {
		type: String,
		required: true,
		unique: true,
	},
});

const State = mongoose.model("State", Schema);
export default State;
