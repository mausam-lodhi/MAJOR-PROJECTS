import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaHome, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
const ContactUs = () => {
	const navigate = useNavigate();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}
		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		}
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length === 0) {
			console.log("Form submitted:", formData);
			setFormData({ name: "", email: "", subject: "", message: "" });
			setErrors({});
		} else {
			setErrors(validationErrors);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	return (
		<>
			<header className={` bg-white shadow-lg py-4 px-6 sticky top-0 z-50`}>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div
						className='flex items-center space-x-3 cursor-pointer'
						onClick={() => {
							setIsMobileMenuOpen(false);
							navigate("/");
						}}>
						<img
							src='https://images.unsplash.com/photo-1577563908411-5077b6dc7624'
							alt='MyDiary Logo'
							className='h-10 w-10 rounded-full object-cover border-2 border-purple-500'
						/>
						<span className='text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>myDiary</span>
					</div>

					<div className='hidden md:flex items-center space-x-8'>
						<button
							className='nav-link group flex items-center space-x-2 px-4 py-2  text-black
                                            transition-colors duration-300 hover:text-purple-600'
							onClick={() => navigate("/")}>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300 hover:text-purple-600`}
								onClick={() => navigate("/login")}>
								<FaSignInAlt className='group-hover:scale-110 transition-transform duration-300' />
								<span>Login</span>
							</button>
							<button
								onClick={() => {
									navigate("/signup");
								}}
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration- hover:text-purple-600`}>
								<FaUserPlus className='group-hover:scale-110 transition-transform duration-300' />
								<span>Signup</span>
							</button>
						</div>
						<button
							className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600  text-black`}
							style={{ backgroundColor: "lavenderblush" }}
							onClick={() => navigate("/contact")}>
							<IoIosContact className='group-hover:scale-110 transition-transform duration-300' />
							<span>Contact </span>
						</button>
					</div>

					<button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<svg className={`h-6 w-6 ${isDarkMode ? "text-white" : "text-gray-800"}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
						</svg>
					</button>
				</div>

				{isMenuOpen && (
					<div className='md:hidden mt-4 pb-4'>
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
								setIsMobileMenuOpen(false);
								navigate("/");
							}}
							className={`mobile-nav-link w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600`}>
							<FaSignInAlt />
							<span>Login</span>
						</button>
						<button
							onClick={() => {
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
					</div>
				)}
			</header>
			<div className='min-h-[81vh] bg-purple-100'>
				<main className='container mx-auto px-4 py-4'>
					<div className='max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-5'>
						<h2 className='text-3xl font-bold text-center text-gray-800 mb-3'>Contact Us</h2>

						<form onSubmit={handleSubmit} className='space-y-3'>
							<div>
								<label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='name'>
									Name
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FiUser className='text-gray-400' />
									</div>
									<input
										type='text'
										id='name'
										name='name'
										value={formData.name}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
											errors.name ? "border-red-500" : "border-gray-300"
										} focus:outline-none focus:ring-2 focus:ring-purple-500`}
										placeholder='Your name'
									/>
								</div>
								{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
							</div>

							<div>
								<label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='email'>
									Email
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FiMail className='text-gray-400' />
									</div>
									<input
										type='email'
										id='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
											errors.email ? "border-red-500" : "border-gray-300"
										} focus:outline-none focus:ring-2 focus:ring-purple-500`}
										placeholder='your.email@example.com'
									/>
								</div>
								{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
							</div>

							<div>
								<label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='subject'>
									Subject
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FiMessageSquare className='text-gray-400' />
									</div>
									<input
										type='text'
										id='subject'
										name='subject'
										value={formData.subject}
										onChange={handleChange}
										className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
											errors.subject ? "border-red-500" : "border-gray-300"
										} focus:outline-none focus:ring-2 focus:ring-purple-500`}
										placeholder='Message subject'
									/>
								</div>
								{errors.subject && <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>}
							</div>

							<div>
								<label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='message'>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									rows='3'
									className={`w-full px-3 py-2 rounded-lg border ${
										errors.message ? "border-red-500" : "border-gray-300"
									} focus:outline-none focus:ring-2 focus:ring-purple-500`}
									placeholder='Your message here...'></textarea>
								{errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
							</div>

							<button
								type='submit'
								className='w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2'>
								<span>Send Message</span>
								<FiSend className='text-xl' />
							</button>
						</form>

						<div className='bg-gray-50 px-8 py-6'>
							<div className='text-center'>
								<p className='text-gray-600 mb-4'>Thank you for reaching out to My Diary!</p>
								<div className='flex justify-center space-x-6'>
									<a href='#' className='text-gray-600 hover:text-purple-500 transition-colors'>
										<FaFacebook className='text-2xl' />
									</a>
									<a href='https://github.com/mausam-lodhi' className='text-gray-600 hover:text-purple-500 transition-colors'>
										<FaGithub className='text-2xl' />
									</a>
									<a href='#' className='text-gray-600 hover:text-purple-500 transition-colors'>
										<FaInstagram className='text-2xl' />
									</a>
									<a href='https://www.linkedin.com/in/mausam-lodhi-57a020324' className='text-gray-600 hover:text-purple-500 transition-colors'>
										<FaLinkedin className='text-2xl' />
									</a>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default ContactUs;
