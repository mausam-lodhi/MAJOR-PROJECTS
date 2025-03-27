import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

transporter.verify((error, success) => {
	if (error) {
		console.error("Error configuring transporter:", error);
	} else {
		console.log("Transporter is configured correctly:", success);
	}
});

export default transporter;
