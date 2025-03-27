import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { FaHome, FaSignInAlt, FaUserPlus, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const VerificationPage = () => {
	const [code, setCode] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [showBackButton, setShowBackButton] = useState(false);
	const navigate = useNavigate();
	const [correct, setCorrect] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (code.trim()) {
			setShowAlert(true);
			setShowBackButton(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
		}
		try {
			const response = await API.post("/verify-email", { verificationToken: code });
			if (response.statusText === "OK") {
				setCorrect(true);
				setMessage("Code submitted successfully!");
				setTimeout(() => {
					navigate("/login");
				}, 5000);
			} else {
				setCorrect(false);
				setMessage("Code is incorrect. Please try again.");
			}
		} catch (error) {
			console.error("Verification error:", error);
			setCorrect(false);
			setMessage("Code is incorrect. Please try again.");
		}
	};

	const handleBack = () => {
		setShowBackButton(false);
		setCode("");
	};

	const handleCodeChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^[0-9]+$/.test(value)) {
			setCode(value);
		}
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
							className='nav-link group flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() => {
									setIsLogin(true);
									setIsMobileMenuOpen(false);
									navigate("/login");
								}}
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full ${
									isLogin ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
								} transition-colors duration-300`}>
								<FaSignInAlt className='group-hover:scale-110 transition-transform duration-300' />
								<span>Login</span>
							</button>
							<button
								onClick={() => {
									setIsLogin(false);
									navigate("/signup");
								}}
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full ${
									!isLogin ? "bg-pink-600 text-white" : "text-gray-600 hover:text-purple-600"
								} transition-colors duration-300`}>
								<FaUserPlus className='group-hover:scale-110 transition-transform duration-300' />
								<span>Signup</span>
							</button>
						</div>
						<a
							className='nav-link group flex items-center space-x-2  cursor-pointertext-gray-600 hover:text-purple-600 transition-colors duration-300'
							onClick={() => {
								navigate("/about");
							}}>
							<FaInfoCircle className='group-hover:scale-110 transition-transform duration-300' />
							<span>About</span>
						</a>
					</nav>

					<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='md:hidden text-gray-600 hover:text-purple-600 transition-colors duration-300'>
						{isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{isMobileMenuOpen && (
					<nav className='md:hidden mt-4 space-y-2 pb-2'>
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
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 ${isLogin ? "text-purple-600" : "text-gray-600"}`}>
							<FaSignInAlt />
							<span>Login</span>
						</button>
						<button
							onClick={() => {
								setIsLogin(false);
								setIsMobileMenuOpen(false);
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 ${!isLogin ? "text-purple-600" : "text-gray-600"}`}>
							<FaUserPlus />
							<span>Signup</span>
						</button>
						<a
							className='mobile-nav-link flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 px-4 py-2'
							onClick={() => {
								navigate("/about");
							}}>
							<FaInfoCircle />
							<span>About</span>
						</a>
					</nav>
				)}
			</header>
			<div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col'>
				<main className='flex-grow flex items-center justify-center px-4 py-8'>
					<div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300'>
						{message && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>{message}</div>}

						<form onSubmit={handleSubmit} className='space-y-6'>
							<h2 className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8'>
								Verify Your Email
							</h2>

							<div className='space-y-4'>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaKey className='absolute top-3 left-3 text-gray-400' />
									<input
										type='text'
										value={code}
										onChange={handleCodeChange}
										placeholder='Enter Verification Code'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										required
									/>
								</div>
							</div>

							<div className='flex justify-between'>
								<button
									type='button'
									onClick={() => navigate("/login")}
									className='text-sm text-purple-600 hover:text-purple-700 hover:underline transition-all duration-300'>
									Back to Login
								</button>
								<button
									type='button'
									onClick={() => navigate("/signup")}
									className='text-sm text-purple-600 hover:text-purple-700 hover:underline transition-all duration-300'>
									Register Again
								</button>
							</div>

							<button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105'>
								Verify Email
							</button>
						</form>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default VerificationPage;
