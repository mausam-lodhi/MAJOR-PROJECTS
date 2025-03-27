import React, { useState } from "react";
import { FaHome, FaSignInAlt, FaUserPlus, FaLock, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import Footer from "./footer";
import { IoIosContact } from "react-icons/io";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { logout } = useAuth();

	const [isLogin, setIsLogin] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		if (loginData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}
		setError("");
		try {
			const response = await API.post("/login", loginData); // Ensure the endpoint matches the server route
			console.log("Login response:", response.data);
			login(response.data.user, response.data.token);
			localStorage.setItem("token", response.data.token);
			navigate("/welcome");
		} catch (error) {
			if (error.code === "ERR_NETWORK") {
				setError("Unable to connect to server. Please check if server is running.");
			} else {
				setError(error.response?.data?.error || "Invalid email or password");
			}
			console.error("Login error:", error);
		}
	};

	async function handleLogout() {
		try {
			await API.post("/logout");
			logout();
		} catch (error) {
			console.error(error);
		}
	}

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
								onClick={() => setIsLogin(true)}
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
							className={`flex items-center space-x-2  cursor-pointer  text-gray-600 hover:text-purple-600`}
							onClick={() => {
								navigate("/contact");
							}}>
							<IoIosContact className='group-hover:scale-110 transition-transform duration-300' />
							<span>Contact </span>
						</a>
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
								navigate("/");
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600`}>
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
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600 `}
							onClick={() => {
								navigate("/contact");
							}}>
							<IoIosContact className='group-hover:scale-110 transition-transform duration-300' />
							<span>Contact </span>
						</button>
					</nav>
				)}
			</header>
			<div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col'>
				<main className='flex-grow flex items-center justify-center px-4 py-8'>
					<div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300'>
						{error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>{error}</div>}

						<form onSubmit={handleLoginSubmit} className='space-y-6'>
							<h2 className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8'>Welcome Back</h2>
							<div className='space-y-4'>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaEnvelope className='absolute top-3 left-3 text-gray-400' />
									<input
										type='email'
										placeholder='Email Address'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={loginData.email}
										onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
										required
									/>
								</div>
								<div className='relative transform hover:scale-105 transition-transform duration-300'>
									<FaLock className='absolute top-3 left-3 text-gray-400' />
									<input
										type='password'
										placeholder='Password'
										className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300'
										value={loginData.password}
										onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
										required
									/>
								</div>
							</div>
							<div className='flex justify-between'>
								<button
									href='#'
									className='text-sm text-purple-600 px-3 hover:text-purple-700 hover:underline transition-all duration-300'
									onClick={() => navigate("/signup")}>
									Sign Up
								</button>
								<button href='' className='text-sm text-purple-600 px-3 text-right hover:text-purple-700 hover:underline transition-all duration-300'>
									Forget Password?
								</button>
							</div>
							<button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105'>
								Login
							</button>
						</form>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Login;
