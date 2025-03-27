import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Routes from "./Routes/Routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(Routes);

const port = 8080;
const MONGO_URI = "mongodb://localhost:27017/PMJSY";

async function main() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Database is connected dear");
	} catch (err) {
		console.log("Database is not connected dear: ", err);
	}
}

main();

app.listen(port, () => {
	console.log(`Server is running successfully on port ${port}`);
});

app.get("/", (req, res) => {
	res.send("you are in the root directory from index");
});
