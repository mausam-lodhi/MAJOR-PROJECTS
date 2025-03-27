import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaHome, FaInfoCircle, FaPlusCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { TbLogout } from "react-icons/tb";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import Footer from "./footer";
import { Link } from "react-router-dom";
const Entries = () => {
	const { logout } = useAuth(); // Destructure logout from useAuth
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [entries, setEntries] = useState([]);

	async function getEntries() {
		try {
			const response = await API.get("/entries");
			setEntries(response.data);
		} catch (error) {
			console.error(error);
		}
	}
	async function handleLogout() {
		try {
			await API.post("/logout");
			logout();
		} catch (error) {
			console.error(error);
		}
	}
	async function deleteEntry(id) {
		try {
			const response = await API.delete(`/entries/${id}`);
			getEntries();
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		getEntries();
	}, []);
	const [expandedEntries, setExpandedEntries] = useState([]);

	const toggleExpand = (id) => {
		setExpandedEntries((prev) => (prev.includes(id) ? prev.filter((entryId) => entryId !== id) : [...prev, id]));
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<>
			<header className='bg-white shadow-lg py-4 px-6 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div
						className='flex items-center space-x-3 cursor-pointer'
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600  text-black'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-white-600 bg-purple-600 text-white`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300' />
								<span>Entries</span>
							</button>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600  cursor-pointer`}
								onClick={() => navigate("/add-entries")}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300' />
								<span>Add</span>
							</button>
						</div>
						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600'
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 bg text-black'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300 hover:text-white-600 bg-purple-600 text-white`}
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600  cursor-pointer'
							onClick={() => {
								setIsMobileMenuOpen(false);
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
				)}
			</header>
			<div className='flex flex-col min-h-screen' style={{ backgroundColor: "lavender" }}>
				<div className='flex-grow py-8 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto'>
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-purple-800 hover:text-purple-900 transition-colors duration-300'>
							My Diary Entries
						</h1>
						<div className='space-y-3'>
							{entries.map((entry, index) => (
								<div
									key={entry.id}
									className='bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-l-4 border-purple-500'>
									<div className='p-3'>
										<div className='flex justify-between items-center'>
											<div className='flex items-center space-x-2'>
												<FaCalendarAlt className='text-purple-600' />
												<p className='text-xs sm:text-sm text-gray-600'>{formatDate(entry.date)}</p>
											</div>
											<div className='flex space-x-3'>
												<button
													className='p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-all duration-200'
													aria-label='Edit entry'
													onClick={() => navigate(`/entries/${entry._id}`)}>
													<FaEdit size={16} />
												</button>
												<button
													onClick={() => deleteEntry(entry._id)}
													className='p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-all duration-200'
													aria-label='Delete entry'>
													<FaTrash size={16} />
												</button>
											</div>
										</div>
										<h2 className='mt-1.5 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-200'>
											{entry.title}
										</h2>
										<div className='mt-1.5'>
											<p className='text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed'>
												{entry.description.slice(0, 100)}...
											</p>
											<button
												onClick={() => toggleExpand(entry.id)}
												className='mt-1.5 inline-flex items-center px-3 py-1 border border-transparent text-xs sm:text-sm md:text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-0.5'>
												<span className='mr-2'>{expandedEntries.includes(entry.id) ? "Show Less" : "Read More"}</span>
												{expandedEntries.includes(entry.id) ? <FaChevronUp /> : <FaChevronDown />}
											</button>
											{/* Dropdown content */}
											<div
												className={`mt-2 transition-all duration-300 overflow-hidden ${
													expandedEntries.includes(entry.id) ? "max-h-80" : "max-h-0"
												}`}>
												<div className='p-3 bg-purple-50 rounded-lg'>
													<p className='text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed'>
														{entry.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Entries;
