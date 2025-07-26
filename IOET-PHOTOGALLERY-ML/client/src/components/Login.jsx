import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import API from "../utils/api.js";
import "../css/bootstrap.css";
import "../css/fontawesome.css";
import "../css/login.css";
import PageLoader from "./Spinner";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { logout } = useAuth();

	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [loginData, setLoginData] = useState({
		rollNo: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [error, setError] = useState("");

	// Simulate loader
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

	const handleSocialLogin = (platform) => {
		navigate("/coming-soon");
	};

	const handleForgotPassword = (e) => {
		e.preventDefault();
		navigate("/coming-soon");
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true); // Start loading

		try {
			const response = await API.post("/login", loginData);
			console.log("Login response:", response.data);

			// First check if we have a valid response with user data
			if (!response.data || !response.data.user) {
				setError("Invalid response from server");
				return;
			}

			// Check banned status first
			if (response.data.user.isBanned) {
				setError("This account has been banned. Please contact support for assistance.");
				return;
			}

			// Then check verification status
			if (!response.data.user.isVerified) {
				setError("Please verify your email first");
				navigate("/verify");
				return;
			}

			// If all checks pass, proceed with login
			login(response.data.user, response.data.token);
			localStorage.setItem("token", response.data.token);
			navigate("/wait");
		} catch (error) {
			console.error("Login error:", error);

			if (error.response?.status === 403) {
				setError("Please verify your email before logging in");
				navigate("/verify");
				return;
			}

			// Handle specific error messages from backend
			const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
			setError(errorMessage);
		} finally {
			setIsSubmitting(false); // Stop loading
		}
	};

	const handleInputChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='page-section login-page'>
			{/* Loader */}
			{loading && (
				<div className='loader-wrapper' id='loader-wrapper'>
					<div className='loader'></div>
				</div>
			)}

			{/* Show spinner when form is submitting */}
			{isSubmitting && <PageLoader />}

			{/* Particles Background */}
			<div id='particles-js' className='particles-bg'></div>

			{/* Login Form */}
			<div className='content-detail'>
				<form className='login-form' onSubmit={handleLoginSubmit}>
					{/* <div className='imgcontainer'>
						<img src={Logo} alt='Avatar' className='avatar' />
					</div> */}
					<div className='input-control'>
						<input type='text' placeholder='Enter Roll Number' name='rollNo' value={loginData.rollNo} onChange={handleInputChange} required />
						<span className='password-field-show'>
							<input
								type={showPassword ? "text" : "password"}
								placeholder='Enter Password'
								name='password'
								value={loginData.password}
								onChange={handleInputChange}
								className='password-field'
								required
							/>
							<span className={`fa fa-fw fa-eye${showPassword ? "-slash" : ""} field-icon toggle-password`} onClick={togglePasswordVisibility}></span>
						</span>
						{error && <div className='error-message'>{error}</div>}
						<label className='label-container'>
							Remember me
							<input type='checkbox' />
							<span className='checkmark'></span>
						</label>
						<span className='psw'>
							<a href='' onClick={handleForgotPassword} className='forgot-btn'>
								Forgot password?
							</a>
						</span>
						<div className='login-btns'>
							<button type='submit'>Login</button>
						</div>
						<div className='division-lines'>
							<p>or login with</p>
						</div>
						<div className='login-with-btns'>
							<button type='button' className='google' onClick={() => handleSocialLogin("google")}>
								<i className='fab fa-google'></i>
							</button>
							<button type='button' className='facebook' onClick={() => handleSocialLogin("facebook")}>
								<i className='fab fa-facebook-f'></i>
							</button>
							<button type='button' className='twitter' onClick={() => handleSocialLogin("twitter")}>
								<i className='fab fa-twitter'></i>
							</button>
							<button type='button' className='linkedin' onClick={() => handleSocialLogin("linkedin")}>
								<i className='fab fa-linkedin-in'></i>
							</button>
							<span className='already-acc'>
								Not a member?{" "}
								<Link to='/signup' className='signup-btn'>
									Sign up
								</Link>
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
