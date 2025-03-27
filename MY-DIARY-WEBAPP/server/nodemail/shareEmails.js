import { VERIFICATION_EMAIL_TEMPLATE } from "./EMAIL_TEMPLATE.js";
import transporter from "./nodemail.config.js";
import { Welcome_Email_Template } from "./EMAIL_TEMPLATE.js";

export const SendVerificationCode = async (email, code) => {
	try {
		const info = transporter.sendMail({
			from: '"My Diary  👻" <harprasadlodhi1984@gmailcom>', // sender address
			to: email, // list of receivers
			subject: "Verify Your Email", // Subject line
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{Code}", code),
			category: "Email Verification", // html body
		});
	} catch (error) {
		console.log(error);
	}
};

export const SendWelcomeMail = async (email, name) => {
	try {
		const info = transporter.sendMail({
			from: '"My Diary  👻" <harprasadlodhi1984@gmailcom>', // sender address
			to: email, // list of receivers
			subject: "Welcome ", // Subject line
			html: Welcome_Email_Template.replace("{name}", name),
			category: "Welcome email", // html body
		});
	} catch (error) {
		console.log(error);
	}
};
