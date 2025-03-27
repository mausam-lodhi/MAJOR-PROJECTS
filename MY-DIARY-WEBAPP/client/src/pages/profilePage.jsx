import React, { useState, useEffect } from "react";
import { FaCalendar, FaPencilAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaPlusCircle, FaBars, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import API from "../utils/api";
import { TbLogout } from "react-icons/tb";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import Footer from "./footer";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
const UserProfile = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const [user, setUser] = useState({
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	});
	async function getProfileDeatails() {
		try {
			const response = await API.get("/profile");
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}
	async function updateProfile() {
		try {
			const response = await API.put("/profile", user);
			console.log(response.data);
			setUser(response.data);
		} catch (error) {
			console.log(error);
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

	useEffect(() => {
		getProfileDeatails();
	}, []);

	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);
	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [editedUser, setEditedUser] = useState({ ...user });
	const [image, setImage] = useState("");

	const handleEditProfile = () => {
		setIsEditingProfile(true);
		setEditedUser({ ...user });
	};
	async function handleLogout() {
		try {
			await API.post("/logout");
			logout();
		} catch (error) {
			console.error(error);
		}
	}

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		try {
			const response = await API.put("/profile", editedUser);
			setUser(response.data);
			setIsEditingProfile(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateEmail = async (e) => {
		e.preventDefault();
		if (newEmail) {
			try {
				const response = await API.put("/profile", { ...user, email: newEmail });
				setUser(response.data);
				setIsEditingEmail(false);
				setNewEmail("");
				setErrorMessage("");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleUpdatePassword = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}
		if (newPassword.length < 6) {
			setErrorMessage("Password must be at least 6 characters long");
			return;
		}
		try {
			const response = await API.put("/profile", { ...user, password: newPassword });
			console.log("Password updated successfully");
			setIsEditingPassword(false);
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setErrorMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 text-black'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 text-black`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<span>Entries</span>
							</button>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 text-black`}
								onClick={() => navigate("/add-entries")}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<span>Add</span>
							</button>
						</div>
						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 cursor-pointer'
							onClick={() => {
								navigate("/about");
							}}>
							<FaInfoCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>About</span>
						</a>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleLogout();
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600'>
							<TbLogout className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>Logout</span>
						</button>
						<button
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-300 bg-purple-600 text-white'
							onClick={() => {
								navigate("/profile");
							}}>
							<MdAccountCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
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
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 text-black'>
							<FaHome className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>Home</span>
						</button>
						<div className='flex items-center space-x-4'>
							<button
								className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600`}
								onClick={() => navigate("/entries")}>
								<GoFileDirectoryFill className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<span>Entries</span>
							</button>
						</div>
						<div className='flex items-center space-x-4'>
							<button className={`nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600`}>
								<FaPlusCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<span>Add</span>
							</button>
						</div>

						<a
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600'
							onClick={() => {
								setIsMobileMenuOpen(false);
								navigate("/about");
							}}>
							<FaInfoCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>About</span>
						</a>
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleLogout();
								navigate("/");
							}}
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-600 text-black'>
							<TbLogout className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>Logout</span>
						</button>
						<button
							className='nav-link group flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 hover:text-purple-300 bg-purple-600 text-white'
							onClick={() => {
								navigate("/profile");
							}}>
							<MdAccountCircle className='group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
							<span>Account</span>
						</button>
					</nav>
				)}
			</header>
			<div className='min-h-[80vh] bg-[#E6E6FA] py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center'>
				<div className='max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden'>
					<h1 className='text-3xl font-bold text-center text-gray-900 pt-6'>Profile</h1>
					<div className='relative h-36 bg-gradient-to-r from-blue-500 to-purple-600'>
						<div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
							<img
								src={{ image }}
								alt='Profile'
								className='w-24 h-24 rounded-full border-4 border-white shadow-lg'
								onError={(e) => {
									e.target.src =
										"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
								}}
							/>
						</div>
					</div>

					<div className='pt-16 px-8 pb-6'>
						<div className='flex justify-between items-start mb-6'>
							<div>
								{!isEditingProfile ? (
									<>
										<h1 className='text-3xl font-bold text-gray-900'>{user.fullname}</h1>
										<p className='mt-2 text-gray-600'>{user.bio}</p>
										<div className='flex items-center mt-2 text-gray-500'>
											<FaMapMarkerAlt className='mr-2 group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
											<span>{user.location}</span>
										</div>
									</>
								) : (
									<form onSubmit={handleUpdateProfile} className='space-y-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700'>Name</label>
											<input
												type='text'
												value={editedUser.fullname}
												onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })}
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700'>Bio</label>
											<textarea
												value={editedUser.bio}
												onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700'>Location</label>
											<input
												type='text'
												value={editedUser.location}
												onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
											/>
										</div>
										<div className='flex justify-end space-x-3'>
											<button
												type='button'
												onClick={() => setIsEditingProfile(false)}
												className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
												Cancel
											</button>
											<button
												type='submit'
												className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'>
												Save Changes
											</button>
										</div>
									</form>
								)}
							</div>
							{!isEditingProfile && (
								<button
									onClick={handleEditProfile}
									className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'>
									<FaPencilAlt className='mr-2 group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
									Edit Profile
								</button>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-gray-200 pb-8'>
							<div className='flex items-center'>
								<FaEnvelope className='text-gray-400 mr-3 text-xl group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<div className='flex-grow'>
									<p className='text-sm text-gray-500'>Email</p>
									<div className='flex items-center justify-between'>
										<p className='text-gray-800'>{user.email}</p>
										<button onClick={() => setIsEditingEmail(true)} className='text-blue-600 hover:text-blue-700 ml-2'>
											Change
										</button>
									</div>
								</div>
							</div>
							<div className='flex items-center'>
								<FaLock className='text-gray-400 mr-3 text-xl group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<div className='flex-grow'>
									<p className='text-sm text-gray-500'>Password</p>
									<div className='flex items-center justify-between'>
										<p className='text-gray-800'>********</p>
										<button onClick={() => setIsEditingPassword(true)} className='text-blue-600 hover:text-blue-700 ml-2'>
											Change
										</button>
									</div>
								</div>
							</div>
							<div className='flex items-center'>
								<FaPhone className='text-gray-400 mr-3 text-xl group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<div>
									<p className='text-sm text-gray-500'>Phone</p>
									<p className='text-gray-800'>
										<span className='mr-1'>+</span>
										{user.mobile_number}
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<FaCalendar className='text-gray-400 mr-3 text-xl group-hover:scale-110 transition-transform duration-300 hover:scale-y-125' />
								<div>
									<p className='text-sm text-gray-500'>Joined</p>
									<p className='text-gray-800'>{formatDate(user.createdAt)}</p>
								</div>
							</div>
						</div>

						{/* Email Update Modal */}
						{isEditingEmail && (
							<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
								<div className='bg-white p-8 rounded-lg w-full max-w-md'>
									<div className='flex justify-between items-center mb-6'>
										<h2 className='text-xl font-semibold'>Update Email</h2>
										<button onClick={() => setIsEditingEmail(false)} className='text-gray-500 hover:text-gray-700'>
											<FaTimes />
										</button>
									</div>
									<form onSubmit={handleUpdateEmail}>
										<div className='mb-4'>
											<label className='block text-gray-700 text-sm font-bold mb-2'>New Email Address</label>
											<input
												type='email'
												value={newEmail}
												onChange={(e) => setNewEmail(e.target.value)}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												required
											/>
										</div>
										<div className='flex justify-end'>
											<button
												type='button'
												onClick={() => setIsEditingEmail(false)}
												className='mr-4 text-gray-600 hover:text-gray-800'>
												Cancel
											</button>
											<button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
												Update Email
											</button>
										</div>
									</form>
								</div>
							</div>
						)}

						{/* Password Update Modal */}
						{isEditingPassword && (
							<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
								<div className='bg-white p-8 rounded-lg w-full max-w-md'>
									<div className='flex justify-between items-center mb-6'>
										<h2 className='text-xl font-semibold'>Update Password</h2>
										<button onClick={() => setIsEditingPassword(false)} className='text-gray-500 hover:text-gray-700'>
											<FaTimes />
										</button>
									</div>
									{errorMessage && <div className='mb-4 text-red-500 text-sm'>{errorMessage}</div>}
									<form onSubmit={handleUpdatePassword}>
										<div className='mb-4'>
											<label className='block text-gray-700 text-sm font-bold mb-2'>Current Password</label>
											<input
												type='password'
												value={currentPassword}
												onChange={(e) => setCurrentPassword(e.target.value)}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												required
											/>
										</div>
										<div className='mb-4'>
											<label className='block text-gray-700 text-sm font-bold mb-2'>New Password</label>
											<input
												type='password'
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												required
											/>
										</div>
										<div className='mb-6'>
											<label className='block text-gray-700 text-sm font-bold mb-2'>Confirm New Password</label>
											<input
												type='password'
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												required
											/>
										</div>
										<div className='flex justify-end'>
											<button
												type='button'
												onClick={() => setIsEditingPassword(false)}
												className='mr-4 text-gray-600 hover:text-gray-800'>
												Cancel
											</button>
											<button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
												Update Password
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default UserProfile;
