import React, { useState } from "react";
import { FaHome, FaSignInAlt, FaUserPlus, FaLock, FaEnvelope, FaUser, FaBars, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoIosContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Footer from "./footer";

function Signup() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};
	const [error, setError] = useState("");
	const [signupData, setSignupData] = useState({
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
		mobile_number: "",
		bio: "",
		location: "",
	});
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const handleSignupSubmit = async (e) => {
		e.preventDefault();

		if (!validateEmail(signupData.email)) {
			setError("Please enter a valid email address");
			return;
		}

		if (signupData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		if (signupData.password !== signupData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (signupData.mobile_number.length < 10) {
			setError("Please enter a valid mobile number");
			return;
		}
		if (signupData.bio.length < 10) {
			setError("Bio must be at least 10 characters long");
			return;
		}
		if (signupData.location.length < 3) {
			setError("Location must be at least 3 characters long");
			return;
		}

		setError("");

		try {
			await API.post("/register", signupData);
		} catch (error) {
			setError(error.response?.data?.error || "Registration failed");
		}

		navigate("/verify");
	};
	return (
		<>
			<header className='bg-white shadow-lg py-4 px-6 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div className='flex items-center space-x-3'>
						<img
							src='https://images.unsplash.com/photo-1577563908411-5077b6dc7624'
							alt='MyDiary Logo'
							className='h-10 w-10 rounded-full object-cover border-2 border-purple-500'
						/>
						<span className='text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>myDiary</span>
					</div>

					<nav className='hidden md:flex items-center space-x-6'>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300 hover:text-purple-600'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() => navigate("/login")}
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300 hover:text-purple-600`}>
								<FaSignInAlt className='group-hover:scale-110 transition-transform duration-300' />
								<span>Login</span>
							</button>
							<button
								onClick={() => {
									setIsMobileMenuOpen(false);
									navigate("/signup");
								}}
								className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 bg-yellow-600 text-white'>
								<FaUserPlus className='group-hover:scale-110 transition-transform duration-300' />
								<span>Sign UP</span>
							</button>
						</div>
						<button
							className={`flex items-center space-x-2  cursor-pointer  text-gray-600 hover:text-purple-600`}
							onClick={() => {
								navigate("/contact");
							}}>
							<IoIosContact className='group-hover:scale-110 transition-transform duration-300' />
							<span>Contact </span>
						</button>
					</nav>

					<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='md:hidden text-gray-600 hover:text-purple-600 transition-colors duration-300'>
						{isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{isMobileMenuOpen && (
					<nav className='md:hidden mt-4 pb-4'>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								navigate("/");
							}}
							className='mobile-nav-link flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 px-4 py-2'>
							<FaHome />
							<span>Home</span>
						</button>
						<button
							onClick={() => {
								setIsLogin(true);
								setIsMobileMenuOpen(false);
								navigate("/login");
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600 `}>
							<FaSignInAlt />
							<span>Login</span>
						</button>
						<button
							onClick={() => {
								setIsLogin(false);
								setIsMobileMenuOpen(false);
								navigate("/signup");
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600`}>
							<FaUserPlus />
							<span>Signup</span>
						</button>
						<button
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600`}
							onClick={() => {
								navigate("/contact");
							}}>
							<IoIosContact className='group-hover:scale-110 transition-transform duration-300' />
							<span>Contact </span>
						</button>
					</nav>
				)}
			</header>
			<div className='  min-h-[81vh] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-around'>
				<main className='flex-grow flex items-center justify-center px-4 py-8'>
					<div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300 md:h-auto'>
						{error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>{error}</div>}
						<form onSubmit={handleSignupSubmit} className='space-y-6 '>
							<h2 className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8'>
								Create Account
							</h2>
							<div className='space-y-4'>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaUser className='absolute top-3 left-3 text-gray-400' />
									<input
										type='text'
										placeholder='Full Name'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.fullname}
										onChange={(e) => setSignupData({ ...signupData, fullname: e.target.value })}
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaEnvelope className='absolute top-3 left-3 text-gray-400' />
									<input
										type='email'
										placeholder='Email Address'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.email}
										onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300 z-10'>
									<PhoneInput
										country='us'
										value={signupData.mobile_number}
										onChange={(phone) => setSignupData({ ...signupData, mobile_number: phone })}
										inputClass='w-full pl-16 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										containerClass='w-full'
										dropdownClass='absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50'
										buttonClass='absolute left-0 top-0 h-full px-3 border-r border-gray-200 bg-gray-50 rounded-l-lg hover:bg-gray-100'
										searchClass='p-2 border-b border-gray-200'
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaUser className='absolute top-3 left-3 text-gray-400' />
									<textarea
										placeholder='Bio'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.bio}
										onChange={(e) => setSignupData({ ...signupData, bio: e.target.value })}
										rows='3'
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaMapMarkerAlt className='absolute top-3 left-3 text-gray-400' />
									<input
										type='text'
										placeholder='Location'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.location}
										onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaLock className='absolute top-3 left-3 text-gray-400' />
									<input
										type='password'
										placeholder='Password'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.password}
										onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaLock className='absolute top-3 left-3 text-gray-400' />
									<input
										type='password'
										placeholder='Confirm Password'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={signupData.confirmPassword}
										onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
										required
									/>
								</div>
							</div>
							<button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105'>
								Sign Up
							</button>
						</form>
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
}
export default Signup;
