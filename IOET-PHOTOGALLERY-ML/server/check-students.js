import mongoose from "mongoose";
import Student from "./models/Student.js";
import dotenv from "dotenv";
dotenv.config();

async function checkStudents() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		const students = await Student.find({}).select("name ImageUrl");
		console.log(`Found ${students.length} students in database:`);
		students.forEach((student, index) => {
			console.log(`${index + 1}. ${student.name} - ${student.ImageUrl}`);
		});
		process.exit(0);
	} catch (error) {
		console.error("Error:", error.message);
		process.exit(1);
	}
}

checkStudents();
