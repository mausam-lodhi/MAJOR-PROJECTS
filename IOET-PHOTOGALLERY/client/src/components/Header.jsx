import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyLogo from "../images/IOETGALLERY (2).png";

const Header = () => {
	const location = useLocation();
	const { logout } = useAuth();
	const [isMenuActive, setIsMenuActive] = useState(false);
	const isActive = (path) => location.pathname === path;

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 991) {
				const navMenu = document.querySelector(".nav-menu");
				if (navMenu) {
					navMenu.classList.remove("active");
					setIsMenuActive(false);
				}
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleMenu = (e) => {
		e.preventDefault();
		const navMenu = document.querySelector(".nav-menu");
		if (navMenu) {
			navMenu.classList.toggle("active");
			setIsMenuActive(!isMenuActive);
		}
	};

	return (
		<header className='clearfix'>
			<div className='logo'>
				<Link to='/portfolio'>
					<img src={MyLogo} alt='Portreto Logo' />
				</Link>
			</div>

			<a className='elemadded responsive-link' href='#' onClick={toggleMenu}>
				Menu
			</a>

			<nav className='nav-menu'>
				<ul className='menu-list'>
					<li>
						<Link className={isActive("/portfolio") ? "active" : ""} to='/portfolio'>
							Home
						</Link>
					</li>
					<li>
						<Link className={isActive("/about") ? "active" : ""} to='/about'>
							About
						</Link>
					</li>
					<li>
						<Link className={isActive("/gallery") ? "active" : ""} to='/gallery'>
							Gallery
						</Link>
					</li>
					<li>
						<Link className={isActive("/contact") ? "active" : ""} to='/contact'>
							Contact
						</Link>
					</li>
					<li>
						<a
							href=''
							onClick={(e) => {
								e.preventDefault();
								logout();
							}}
							className={isActive("/logout") ? "active" : ""}>
							Log Out
						</a>
					</li>
					<li>
						<Link className={isActive("/image/upload") ? "active" : ""} to='/image/upload'>
							Upload Image
						</Link>
					</li>
				</ul>
			</nav>

			<div className='social-box'>
				<p>Find us on:</p>
				<ul className='social-icons'>
					<li>
						<a className='facebook' href='/added-soon'>
							<i className='fa fa-github'></i>
						</a>
					</li>
					<li>
						<a className='linkedin' href='/added-soon'>
							<i className='fa fa-linkedin'></i>
						</a>
					</li>
					<li>
						<a className='telegram' href='https://t.me/koinahotahai'>
							<i className='fa fa-telegram'></i>
						</a>
					</li>
					<li>
						<a className='whatsapp' href='/added-soon'>
							<i className='fa fa-whatsapp'></i>
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
