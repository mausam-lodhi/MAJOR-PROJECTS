import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import API from "../utils/api";
import "../css/bootstrap.css";
import "../css/fontawesome.css";
import "../css/login.css";

const SignUp = () => {
	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@dhsgsu\.edu\.in$/;
		return emailRegex.test(email);
	};

	const validateRollNo = (rollNo) => {
		const rollNoRegex = /^y\d{9}$/; // Starts with 'y' followed by exactly 9 digits
		return rollNoRegex.test(rollNo.toLowerCase());
	};

	const [error, setError] = useState("");
	const [signupData, setSignupData] = useState({
		rollNo: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSignupSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (!privacyPolicyAccepted) {
				setError("Please accept the privacy policy to continue");
				return;
			}

			if (!validateRollNo(signupData.rollNo)) {
				setError("Roll number must start with 'y' followed by 9 digits");
				return;
			}

			if (!validateEmail(signupData.email)) {
				setError("Please use your institutional email (@dhsgsu.edu.in)");
				return;
			}

			if (signupData.password !== signupData.confirmPassword) {
				setError("Passwords do not match");
				return;
			}

			const response = await API.post("/register", {
				rollNo: signupData.rollNo.toLowerCase(),
				email: signupData.email.toLowerCase(),
				password: signupData.password,
			});

			console.log("Registration response:", response.data); // Debug log

			if (response.data.success) {
				// Store using the updated response structure
				if (response.data.data) {
					localStorage.setItem("userId", response.data.data.userId);
					localStorage.setItem("userEmail", response.data.data.email);
				} else {
					// Fallback for old response structure
					const user = {
						userId: response.data.user?._id,
						email: response.data.user?.email,
					};
					localStorage.setItem("userId", user.userId);
					localStorage.setItem("userEmail", user.email);
				}

				// Show success message before redirecting
				setError(""); // Clear any existing errors
				navigate("/verify");
			}
		} catch (error) {
			console.error("Registration error:", error);
			if (error.response?.data?.message) {
				setError(error.response.data.message);
			} else {
				setError("Registration failed. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
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

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSocialSignup = (platform) => {
		navigate("/coming-soon");
	};

	return (
		<div className='page-section login-page'>
			{/* Loader */}
			{loading && (
				<div className='loader-wrapper' id='loader-wrapper'>
					<div className='loader'></div>
				</div>
			)}

			{/* Particles Background */}
			<div id='particles-js' className='particles-bg'></div>

			{/* Signup Form */}

			<div className='content-detail'>
				<form className='signup-form' method='post' onSubmit={handleSignupSubmit}>
					{/* <div className='imgcontainer'>
						<img src='images/logo-2.png' alt='logo' className='avatar' />
					</div> */}
					<div className='input-control'>
						<div className='row p-l-5 p-r-5'>
							<div className='col-md-6 p-l-10 p-r-10'>
								<input
									type='text'
									placeholder='Enter Roll Number'
									name='rollNo'
									value={signupData.rollNo}
									onChange={(e) => setSignupData({ ...signupData, rollNo: e.target.value })}
									required
								/>
							</div>
							<div className='col-md-6 p-l-10 p-r-10'>
								<input
									type='email'
									placeholder='Enter Email'
									name='email'
									value={signupData.email}
									onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
									required
								/>
							</div>

							<div className='col-md-6 p-l-10 p-r-10'>
								<input
									type={showPassword ? "text" : "password"}
									placeholder='Enter Password'
									name='password'
									value={signupData.password}
									onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
									required
								/>
							</div>
							<div className='col-md-6 p-l-10 p-r-10'>
								<span className='password-field-show'>
									<input
										type={showPassword ? "text" : "password"}
										placeholder='Re-enter Password'
										name='confirmPassword'
										value={signupData.confirmPassword}
										onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
										required
									/>
									<span
										className={`fa fa-fw fa-eye${showPassword ? "-slash" : ""} field-icon toggle-password`}
										onClick={togglePasswordVisibility}></span>
								</span>
							</div>
						</div>
						<label className='label-container'>
							I agree with <a href='/coming-soon'>privacy policy</a>
							<input type='checkbox' checked={privacyPolicyAccepted} onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)} />
							<span className='checkmark'></span>
						</label>
						{error && <div className='error-message'>{error}</div>}
						<div className='login-btns'>
							<button type='submit'>Sign up</button>
						</div>
						<div className='division-lines'>
							<p>or signup with</p>
						</div>
						<div className='login-with-btns'>
							<button type='button' className='google' onClick={() => handleSocialSignup("google")}>
								<i className='fab fa-google'></i>
							</button>
							<button type='button' className='facebook' onClick={() => handleSocialSignup("facebook")}>
								<i className='fab fa-facebook-f'></i>
							</button>
							<button type='button' className='twitter' onClick={() => handleSocialSignup("twitter")}>
								<i className='fab fa-twitter'></i>
							</button>
							<button type='button' className='linkedin' onClick={() => handleSocialSignup("linkedin")}>
								<i className='fab fa-linkedin-in'></i>
							</button>
							<span className='already-acc'>
								Already you have an account?{" "}
								<Link to='/login' className='login-btn'>
									Login
								</Link>
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
