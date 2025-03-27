import { useState, useEffect } from "react";
import "./Header.css"; // Ensure this file contains styles for dark mode
import logo from "../assets/techtalks.jpg";

const Header = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Apply or remove dark mode class on body and main content area
	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark-mode");
			document.querySelector(".main-content").classList.add(
				"dark-mode"
			);
		} else {
			document.body.classList.remove("dark-mode");
			document.querySelector(
				".main-content"
			).classList.remove("dark-mode");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	return (
		<header>
			{/* Logo */}
			<div className='logo_techtalks bg-gradient-to-r'>
				<img
					src={logo}
					alt='Logo'
				/>
				<a id='techtalks'>Tech Talks</a>
			</div>
			{/* Navigation Links */}

			<a href='#home'>Home</a>
			<a href='#services'>Events</a>
			<a href='#about'>Features</a>
			<a href='#contact'>FAQs</a>

			{/* Search Bar */}
			<input
				type='text'
				placeholder='Search...'
				id='search-bar'
			/>

			{/* Buttons */}
			<button className='login'>Login</button>
			<button className='signup'>Sign Up</button>
			<button
				className='dark-mode-toggle'
				onClick={toggleDarkMode}
			>
				{isDarkMode ? "Light Mode" : "Dark Mode"}
			</button>
		</header>
	);
};

export default Header;
