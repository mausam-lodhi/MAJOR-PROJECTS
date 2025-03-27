import express from "express";
import bodyParser from "body-parser";
import transporter from "./nodemail.config.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Handle form submission
app.post("/sendEmail", async (req, res) => {
	console.log("Received message:", req.body);
	const { name, email, message } = req.body;

	// Use nodemailer to send email
	try {
		const mailOptions = {
			from: email,
			to: process.env.EMAIL_USER, // Use environment variable for email
			subject: `New message from ${name}`,
			text: `You have received a new message from ${name} (${email}):\n\n${message}`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).redirect("/"); // Redirect to the client page after success
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).send("Failed to send message.");
	}
});

// Start the server
const PORT = process.env.PORT || 3000; // Ensure the port matches the client-side fetch URL
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
