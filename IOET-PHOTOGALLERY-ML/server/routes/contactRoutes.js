import express from "express";
import transporter from "../nodemail/nodemail.config.js";
const router = express.Router();

router.post("/sendEmail", async (req, res) => {
	try {
		const { name, mail, comment } = req.body;

		if (!name || !mail || !comment) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(mail)) {
			return res.status(400).json({ error: "Invalid email address" });
		}

		// Admin notification email
		const adminMailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: `New Contact Form Submission from ${name}`,
			html: `
                <div style="padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
                    <h2 style="color: #333;">New Contact Form Message</h2>
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${mail}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: white; padding: 15px; border-radius: 5px;">
                        <p>${comment}</p>
                    </div>
                </div>
            `,
		};

		// User confirmation email
		const userConfirmation = {
			from: process.env.EMAIL_USER,
			to: mail,
			subject: "Thank you for contacting IoET Gallery",
			html: `
                <div style="padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
                    <h2 style="color: #333;">Thank you for reaching out!</h2>
                    <p>Dear ${name},</p>
                    <p>We have received your message and will get back to you as soon as possible.</p>
                    <p><strong>Your message:</strong></p>
                    <div style="background-color: white; padding: 15px; border-radius: 5px;">
                        <p><em>${comment}</em></p>
                    </div>
                    <br>
                    <p>Best regards,</p>
                    <p>IoET Gallery Team</p>
                </div>
            `,
		};

		// Send both emails concurrently
		await Promise.all([transporter.sendMail(adminMailOptions), transporter.sendMail(userConfirmation)]);

		res.status(200).json({
			success: true,
			message: "Thank you for your message. We've sent you a confirmation email.",
		});
	} catch (error) {
		console.error("Email sending error:", error);
		res.status(500).json({
			success: false,
			error: "Failed to send email. Please try again later.",
		});
	}
});

export default router;
