import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "../css/bootstrap.css";
import "../css/fontawesome.css";
import "../css/login.css";

const VerificationPage = () => {
	const navigate = useNavigate();
	const [code, setCode] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [userEmail, setUserEmail] = useState("");

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const email = localStorage.getItem("userEmail");

		if (!userId) {
			navigate("/signup");
			return;
		}

		if (email) {
			setUserEmail(email);
		}
	}, [navigate]);

	useEffect(() => {
		setLoading(true); // Start with loading true
		setTimeout(() => setLoading(false), 2000); // Show loader for 2 seconds
	}, []);
	// Initialize particles.js
	useEffect(() => {
		particlesJS("particles-js", {
			particles: {
				number: { value: 80, density: { enable: true, value_area: 800 } },
				color: { value: "#ffffff" },
				shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
				opacity: { value: 0.5, random: false },
				size: { value: 5, random: true },
				line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
				move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out" },
			},
			interactivity: {
				detect_on: "canvas",
				events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
			},
			retina_detect: true,
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const userId = localStorage.getItem("userId");
		const userEmail = localStorage.getItem("userEmail");

		if (!userId || !userEmail) {
			setMessage({
				type: "error",
				text: "Verification session expired. Please register again.",
			});
			setTimeout(() => navigate("/signup"), 2000);
			return;
		}

		try {
			const response = await API.post("/verify-email", {
				verificationToken: code.trim(), // Remove any whitespace
				userId: userId,
			});

			if (response.data.success) {
				setMessage({
					type: "success",
					text: "Email verified successfully! Redirecting to login...",
				});

				// Clear verification data
				localStorage.removeItem("userId");
				localStorage.removeItem("userEmail");

				setTimeout(() => navigate("/login"), 2000);
			}
		} catch (error) {
			console.error("Verification error:", error);
			setMessage({
				type: "error",
				text: error.response?.data?.message || "Verification failed. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	// Add resend verification code functionality
	const handleResendCode = async () => {
		const userId = localStorage.getItem("userId");
		const userEmail = localStorage.getItem("userEmail");

		if (!userId || !userEmail) {
			setMessage({
				type: "error",
				text: "Session expired. Please register again.",
			});
			setTimeout(() => navigate("/signup"), 2000);
			return;
		}

		try {
			setLoading(true);
			const response = await API.post("/resend-verification", { userId });

			if (response.data.success) {
				setMessage({
					type: "success",
					text: "New verification code sent to your email",
				});
			}
		} catch (error) {
			console.error("Resend error:", error);
			setMessage({
				type: "error",
				text: error.response?.data?.message || "Failed to resend verification code",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCodeChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^[0-9]+$/.test(value)) {
			setCode(value);
		}
	};

	return (
		<>
			{/* Preloader - moved outside of section */}
			{loading && (
				<div className='loader-wrapper'>
					<div className='loader'></div>
				</div>
			)}
			{/* Main page */}
			<section className='page-section login-page'>
				<div className='full-width-screen'>
					<div className='container-fluid p-0'>
						<div className='particles-bg' id='particles-js'>
							<div className='content-detail'>
								<form className='forgot-form' onSubmit={handleSubmit}>
{/* 									<div className='imgcontainer'>
										<img src='images/logo-2.png' alt='logo' className='avatar' />
									</div> */}
									<div className='input-control'>
										{message && <div className={`alert alert-${message.type === "success" ? "success" : "danger"}`}>{message.text}</div>}
										<div className='text-center mb-3 '>
											<span style={{ color: "gray", fontSize: "14px" }}>Enter the verification code sent to {userEmail}</span>
										</div>
										<input
											type='text'
											value={code}
											onChange={handleCodeChange}
											placeholder='Enter verification code'
											required
											maxLength='6'
										/>
										<div className='login-btns'>
											<button type='submit' disabled={loading}>
												{loading ? "Verifying..." : "Verify "}
											</button>
											<button type='button' onClick={handleResendCode} disabled={loading}>
												Resend
											</button>
										</div>
										<div className='login-with-btns'>
											<span className='already-acc'>
												Return to{" "}
												<a href='/login' className='login-btn'>
													Login
												</a>
											</span>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default VerificationPage;
