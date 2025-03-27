import React, { useState, useEffect } from "react";
import { FaUsers, FaBook, FaHome, FaInfoCircle, FaBars, FaPlusCircle, FaTimes } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { TbLogout } from "react-icons/tb";
import { GoFileDirectoryFill } from "react-icons/go";
import Footer from "./footer";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [user, setUser] = useState();
	const [entries, setEntries] = useState();

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await API.get("/stats");
				setUser(response.data.userCount);
				setEntries(response.data.entryCount);
			} catch (error) {
				console.error("Error fetching stats:", error);
			}
		};
		fetchStats();
	}, []);

	async function handleLogout() {
		try {
			await API.post("/logout");
			logout();
		} catch (error) {
			console.error(error);
		}
	}

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const StatCard = ({ title, value, icon: Icon, bgColor }) => (
		<div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4 w-full md:w-64 hover:bg-gray-50'>
			<div className={`${bgColor} p-4 rounded-full hover:scale-110 transition-transform duration-300`}>
				<Icon className='w-8 h-8 text-white hover:rotate-12 transition-transform duration-300' aria-hidden='true' />
			</div>
			<div>
				<h3 className='text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors duration-300'>{title}</h3>
				<p className='text-gray-900 text-2xl font-bold hover:text-blue-600 transition-colors duration-300 text-center'>{value}</p>
			</div>
		</div>
	);

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
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 bg-pink-600 text-white'>
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300   cursor-pointer hover:text-purple-600'
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
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 bg-pink-600 text-white'>
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

						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 cursor-pointer'
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
			<div className='flex flex-col min-h-screen' style={{ backgroundColor: "#E6E6FA" }}>
				<div className='flex-grow py-12 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<div className='text-center mb-10'>
							<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight hover:text-blue-800 transition-colors duration-300 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)]'>
								Welcome to Your Personal Diary
							</h1>
							<p className='text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed hover:text-gray-800 transition-colors duration-300'>
								A safe space to record your thoughts and memories
							</p>
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-wide hover:text-blue-800 transition-colors duration-300 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_15%)]'>
								User Statistics
							</h2>
							<p className='mt-3 text-lg sm:text-xl text-gray-500 leading-loose hover:text-gray-700 transition-colors duration-300'>
								Overview of myDiary application usage
							</p>
						</div>

						<div className='flex flex-col md:flex-row justify-center items-center gap-8'>
							<StatCard title='Total Users' value={user} icon={FaUsers} bgColor='bg-blue-500' />
							<StatCard title='Total Entries' value={entries} icon={FaBook} bgColor='bg-green-500' />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Welcome;
