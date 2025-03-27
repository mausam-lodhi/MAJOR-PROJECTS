import React from "react";
import { useState } from "react";
import { FaLock, FaCloud, FaMobile, FaEdit, FaCalendar, FaUserLock, FaCloudUploadAlt, FaReact, FaNodeJs, FaDatabase, FaKey } from "react-icons/fa";
import { FaHome, FaInfoCircle, FaBars, FaPlusCircle, FaTimes } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { GoFileDirectoryFill } from "react-icons/go";
import { useAuth } from "../context/AuthContext";
import Footer from "./footer";

const About = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
					<div
						className='flex items-center space-x-3'
						onClick={() => {
							setIsMobileMenuOpen(false);
							navigate("/welcome");
						}}>
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
								navigate("/welcome");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300' />
								<span>Entries</span>
							</button>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600`}
								onClick={() => navigate("/add-entries")}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300' />
								<span>Add</span>
							</button>
						</div>
						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300   hover:text-purple-600 bg-pink-600 text-white  cursor-pointer'
							onClick={() => {
								navigate("/about");
							}}>
							<FaInfoCircle className='group-hover:scale-110 transition-transform duration-300' />
							<span>About</span>
						</a>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleLogout();
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600'>
							<TbLogout className='group-hover:scale-110 transition-transform duration-300' />
							<span>Logout</span>
						</button>
						<button
							className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 `}
							onClick={() => navigate("/profile")}>
							<MdAccountCircle className='group-hover:scale-110 transition-transform duration-300' />
							<span>Account</span>
						</button>
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
								navigate("/welcome");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  '>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300' />
								<span>Entries</span>
							</button>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600`}
								onClick={() => navigate("/add-entries")}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300' />
								<span>Add</span>
							</button>
						</div>

						<button
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 bg-pink-600 text-white  '
							onClick={() => {
								navigate("/about");
							}}>
							<FaInfoCircle className='group-hover:scale-110 transition-transform duration-300' />
							<span>About</span>
						</button>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleLogout();
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600'>
							<TbLogout className='group-hover:scale-110 transition-transform duration-300' />
							<span>Logout</span>
						</button>
						<button
							className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 `}
							onClick={() => navigate("/profile")}>
							<MdAccountCircle className='group-hover:scale-110 transition-transform duration-300' />
							<span>Account</span>
						</button>
					</nav>
				)}
			</header>
			<div className='min-h-screen bg-[#e6e6fa] py-4 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					{/* Header Section */}
					<div className='text-center mb-8'>
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300'>
							About Personal Diary
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 hover:text-gray-800 transition-colors duration-300'>
							A secure and personal space for capturing your thoughts, memories, and daily experiences.
						</p>
					</div>

					{/* Security Features */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<div className='flex items-center mb-2'>
							<FaLock className='text-xl sm:text-2xl text-blue-600 mr-4 hover:scale-110 transition-transform duration-300' />
							<h2 className='text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Secure</h2>
						</div>
						<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>
							Your entries are protected with advanced encryption and secure authentication.
						</p>
					</div>

					{/* Storage Information */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<div className='flex items-center mb-2'>
							<FaCloud className='text-xl sm:text-2xl text-blue-600 mr-4 hover:scale-110 transition-transform duration-300' />
							<h2 className='text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Cloud Storage</h2>
						</div>
						<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>
							All your entries are safely stored in the cloud and accessible anywhere.
						</p>
					</div>

					{/* Design and Accessibility */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<div className='flex items-center mb-2'>
							<FaMobile className='text-xl sm:text-2xl text-blue-600 mr-4 hover:scale-110 transition-transform duration-300' />
							<h2 className='text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Responsive Design</h2>
						</div>
						<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>
							Access your diary from any device with our mobile-friendly interface.
						</p>
						<div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
							<img
								src='https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
								alt='Desktop View'
								className='rounded-lg shadow-md w-full h-32 object-cover hover:opacity-90 transition-opacity duration-300'
							/>
							<img
								src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
								alt='Tablet View'
								className='rounded-lg shadow-md w-full h-32 object-cover hover:opacity-90 transition-opacity duration-300'
							/>
							<img
								src='https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec'
								alt='Mobile View'
								className='rounded-lg shadow-md w-full h-32 object-cover hover:opacity-90 transition-opacity duration-300'
							/>
						</div>
					</div>

					{/* Core Features */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300'>Core Features</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaEdit className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>Create and edit diary entries</p>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaCalendar className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>Organize entries by date</p>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaUserLock className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>Secure user authentication</p>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaCloudUploadAlt className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>Automatic cloud backup</p>
							</div>
						</div>
					</div>

					{/* Technical Details */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300'>Technical Details</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaReact className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<div>
									<h3 className='font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Frontend</h3>
									<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>React.js, Tailwind CSS</p>
								</div>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaNodeJs className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<div>
									<h3 className='font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Backend</h3>
									<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>Node.js, Express.js</p>
								</div>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaDatabase className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<div>
									<h3 className='font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Database</h3>
									<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>MongoDB</p>
								</div>
							</div>
							<div className='flex items-start hover:bg-gray-50 p-2 rounded transition-colors duration-300'>
								<FaKey className='text-lg sm:text-xl text-blue-600 mr-4 mt-1 hover:scale-110 transition-transform duration-300' />
								<div>
									<h3 className='font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300'>Authentication</h3>
									<p className='text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>JWT (JSON Web Tokens)</p>
								</div>
							</div>
						</div>
					</div>

					{/* How to Use */}
					<div className='bg-white rounded-lg shadow-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300'>
						<h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300'>How to Use</h2>
						<ol className='list-decimal list-inside space-y-2 text-base sm:text-lg text-gray-600'>
							<li className='hover:text-gray-800 transition-colors duration-300'>Register for a new account or login if you already have one.</li>
							<li className='hover:text-gray-800 transition-colors duration-300'>Click on "Add Entry" to create your first diary entry.</li>
							<li className='hover:text-gray-800 transition-colors duration-300'>Write your thoughts, add a title and select the date.</li>
							<li className='hover:text-gray-800 transition-colors duration-300'>View all your entries in the "My Diary" section.</li>
							<li className='hover:text-gray-800 transition-colors duration-300'>Edit or delete entries as needed from your diary view.</li>
						</ol>
					</div>

					{/* Version Info */}
					<div className='text-center text-base sm:text-lg text-gray-600 hover:text-gray-800 transition-colors duration-300'>
						<p>Version 1.0.0</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default About;
