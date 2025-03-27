import React, { useState, useEffect } from "react";
import { FaBookOpen, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import {
	FaChevronDown,
	FaChevronUp,
	FaHome,
	FaInfoCircle,
	FaPlusCircle,
	FaBars,
	FaTimes,
	FaPhone,
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaEnvelope,
	FaYoutube,
	FaMapMarkerAlt,
	FaRegCopyright,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { TbLogout } from "react-icons/tb";
import { GoFileDirectoryFill } from "react-icons/go";
import Footer from "./footer";
import { useAuth } from "../context/AuthContext";

const AddEntries = () => {
	const { id } = useParams();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: new Date().toISOString().split("T")[0],
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	async function getEntries() {
		try {
			const response = await API.get(`/entries/${id}`);
			console.log(response.data);
			setFormData(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getEntries();
	}, []);
	async function handleLogout() {
		try {
			await API.post("/logout");
			logout();
		} catch (error) {
			console.error(error);
		}
	}
	async function updateEntries() {
		try {
			const response = await API.put(`/entries/${id}`, formData);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title.trim() || !formData.description.trim()) return;

		setFormData({
			title: "",
			description: "",
			date: new Date().toISOString().split("T")[0],
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
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 text-black`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300' />
								<span>Entries</span>
							</button>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600 text-black`}
								onClick={() => navigate("/add-entries")}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300' />
								<span>Add</span>
							</button>
						</div>
						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  cursor-pointer hover:text-purple-600'
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
							<button className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full  transition-colors duration-300  hover:text-purple-600`}>
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
				)}
			</header>
			<div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4'>
				<div className='max-w-4xl mx-auto'>
					<div className='flex items-center justify-center mb-6'>
						<FaBookOpen className='text-2xl text-purple-600 mr-3' />
						<h1 className='text-3xl font-bold text-gray-800'>Update Digital Diary</h1>
					</div>

					<div className='bg-white rounded-lg shadow-lg p-4 mb-6'>
						<form onSubmit={handleSubmit} className='space-y-3'>
							<div>
								<label className='block text-gray-700 font-medium mb-1'>Title</label>
								<input
									type='text'
									name='title'
									value={formData.title}
									onChange={handleInputChange}
									className='w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
									placeholder='Enter title...'
									required
								/>
							</div>

							<div>
								<label className='block text-gray-700 font-medium mb-1'>Date</label>
								<input
									type='date'
									name='date'
									value={formData.date.split("T")[0]}
									onChange={handleInputChange}
									className='w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
								/>
							</div>

							<div>
								<label className='block text-gray-700 font-medium mb-1'>Entry</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleInputChange}
									rows='4'
									className='w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
									placeholder='Write your thoughts...'
									required></textarea>
							</div>

							<button
								type='submit'
								onClick={() => {
									updateEntries();
									navigate("/entries");
									console.log("Entry added successfully");
								}}
								className='w-full bg-purple-600 text-white py-1.5 px-3 rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center'>
								<FaPlus className='mr-2' />
								Update Entry
							</button>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AddEntries;
