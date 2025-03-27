import React, { useState } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { BsFillJournalBookmarkFill, BsCloudCheck, BsShieldCheck, BsCalendarCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Footer from "./footer";

const FirstPage = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigate = useNavigate();
	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Daily User",
			content: "MyDiary has transformed how I organize my thoughts. It's intuitive and beautiful!",
			image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
		},
		{
			name: "Michael Chen",
			role: "Professional Writer",
			content: "The best journaling platform I've ever used. The features are exactly what I needed.",
			image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
		{
			name: "Emma Davis",
			role: "Student",
			content: "Perfect for keeping track of my daily reflections and academic journey.",
			image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
		},
	];

	const features = [
		{
			icon: <BsFillJournalBookmarkFill className={`text-4xl text-blue-600`} />,
			title: "Digital Journaling",
			description: "Write and organize your thoughts seamlessly",
		},
		{
			icon: <BsCloudCheck className={`text-4xl  text-blue-600`} />,
			title: "Cloud Sync",
			description: "Access your diary from any device, anytime",
		},
		{
			icon: <BsShieldCheck className={`text-4xl text-blue-600 `} />,
			title: "Privacy First",
			description: "Your thoughts are secured with end-to-end encryption",
		},
		{
			icon: <BsCalendarCheck className={`text-4xl text-blue-600`} />,
			title: "Daily Reminders",
			description: "Never miss a day of journaling with custom reminders",
		},
	];

	return (
		<div className={`min-h-screen bg-gray-50  transition-colors duration-300`}>
			<header className='bg-white shadow-lg py-4 px-6 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div className='flex items-center space-x-3'>
						<img
							src='https://images.unsplash.com/photo-1577563908411-5077b6dc7624'
							alt='MyDiary Logo'
							className='h-10 w-10 rounded-full object-cover border-2 border-purple-500'
						/>
						<span className='text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>
							myDiary
						</span>
					</div>

					<nav className='hidden md:flex items-center space-x-6'>
						<button
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-600 text-white
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
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300 hover:text-purple-600`}>
								<FaUserPlus className='group-hover:scale-110 transition-transform duration-300' />
								<span>Signup</span>
							</button>
						</div>
						<a
							className={`flex items-center space-x-2  cursor-pointer  text-black hover:text-purple-600`}
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
								setIsMobileMenuOpen(false);
								navigate("/login");
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
					</nav>
				)}
			</header>

			<section className={`pt-32 pb-20 `} id='home' style={{ backgroundColor: "aliceblue" }}>
				<div className='container mx-auto px-6 '>
					<div className='flex flex-col items-center text-center'>
						<h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 `}>Your Digital Journey Starts Here</h1>
						<p className={`text-lg md:text-xl lg:text-2xl mb-8  text-gray-600 `}>Capture your thoughts, memories, and dreams in one beautiful place.</p>
						<button
							className={`px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700  text-white font-semibold transition duration-300`}
							onClick={() => navigate("/login")}>
							Start Writing
						</button>
					</div>
				</div>
			</section>

			<section className={`py-20 `} style={{ backgroundColor: "lavender" }} id='features'>
				<div className='container mx-auto px-6'>
					<h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800   mb-16`}>Why Choose MyDiary?</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{features.map((feature, index) => (
							<div key={index} className={`p-6  bg-white  rounded-lg shadow-lg hover:shadow-xl transition duration-300`}>
								<div className='mb-4'>{feature.icon}</div>
								<h3 className={`text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2`}>{feature.title}</h3>
								<p className={"text-gray-600"}>{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className={`py-20 `} style={{ backgroundColor: "lavenderblush" }} id='testimonials'>
				<div className='container mx-auto px-6'>
					<h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center  text-gray-800 mb-16`}>What Our Users Say</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{testimonials.map((testimonial, index) => (
							<div key={index} className={`p-6 bg-white   rounded-lg shadow-lg`}>
								<div className='flex items-center mb-4'>
									<img src={testimonial.image} alt={testimonial.name} className='h-12 w-12 rounded-full object-cover' />
									<div className='ml-4'>
										<h3 className={`text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 `}>{testimonial.name}</h3>
										<p className={"text-gray-600"}>{testimonial.role}</p>
									</div>
								</div>
								<p className={"text-gray-600"}>{testimonial.content}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default FirstPage;
