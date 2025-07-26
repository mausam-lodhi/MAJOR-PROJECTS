import React, { useState } from "react";
import "../css/Contact.css";
import PageLoader from "./Spinner";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		mail: "",
		comment: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState({ type: "", message: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setStatus({ type: "", message: "" });

		// Basic validation
		if (!formData.name || !formData.mail || !formData.comment) {
			setStatus({ type: "error", message: "Please fill in all fields" });
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("http://localhost:5000/sendEmail", {
				// Changed port from 8080 to 5000
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus({ type: "success", message: "Message sent successfully! " });
				setFormData({
					name: "",
					mail: "",
					comment: "",
				});
			} else {
				setStatus({ type: "error", message: "Failed to send message. Please try again." });
			}
		} catch (error) {
			console.error("Error sending message:", error);
			setStatus({ type: "error", message: "An error occurred while sending the message." });
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			{isLoading && <PageLoader />}
			<section className='contact-section'>
				<div className='contact-form-part'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-md-6'>
								<form id='contactForm' onSubmit={handleSubmit}>
									<h1>Get in touch</h1>
									<p>For updation, deletion or any related queries contact us here</p>

									<input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Deepak Kumar' required />

									<input
										type='email'
										id='mail'
										name='mail'
										value={formData.mail}
										onChange={handleChange}
										placeholder='youremailid@gmail.com'
										required
									/>

									<textarea
										name='comment'
										id='comment'
										value={formData.comment}
										onChange={handleChange}
										placeholder='Write Your message'
										required></textarea>

									{status.message && (
										<div className={`alert ${status.type === "success" ? "alert-success" : "alert-error"}`}>{status.message}</div>
									)}

									<button
										type='submit'
										disabled={isLoading}
										style={{
											cursor: "pointer",
											color: "gray",
											border: ".1px solid gray",
											borderRadius: "10px",
											padding: "5px 10px",
											backgroundColor: "white",
											fontSize: "12px",
											fontWeight: "bold",
											transition: "background-color 0.3s, color 0.3s",
											opacity: isLoading ? 0.7 : 1,
										}}>
										{isLoading ? (
											"Sending..."
										) : (
											<>
												<i className='ri-mail-line'></i>
												Send Message
											</>
										)}
									</button>
								</form>
							</div>
							<div className='col-md-6'>
								<div className='info-data'>
									<h3>Our Location</h3>
									<p>IoET Department of Computer Science</p>
								</div>
								<div className='info-data'>
									<h3>Our Phone</h3>
									<p>
										+9188271496xx
										<br />
									</p>
								</div>
								<div className='info-data'>
									<h3>Our Email</h3>
									<p>
										r65374240@gmail.com <br />
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
