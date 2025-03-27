// import React from "react";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaGithub,
} from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const handleSmoothScroll = (e, targetId) => {
		e.preventDefault();
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const footerLinks = [
		{ id: "home", label: "Sponsers", href: "#home" },
		{ id: "about", label: "About Us", href: "#about" },
		{ id: "services", label: "Services", href: "#services" },
		{ id: "contact", label: "Contact", href: "#contact" },
		{ id: "careers", label: "Careers", href: "#careers" },
		{ id: "privacy", label: "Privacy Policy", href: "#privacy" },
	];

	const socialLinks = [
		{
			id: "facebook",
			icon: <FaFacebook className='w-6 h-6' />,
			href: "https://facebook.com",
			label: "Follow us on Facebook",
		},
		{
			id: "twitter",
			icon: <FaTwitter className='w-6 h-6' />,
			href: "https://twitter.com",
			label: "Follow us on Twitter",
		},
		{
			id: "instagram",
			icon: <FaInstagram className='w-6 h-6' />,
			href: "https://instagram.com",
			label: "Follow us on Instagram",
		},
		{
			id: "linkedin",
			icon: <FaLinkedin className='w-6 h-6' />,
			href: "https://linkedin.com",
			label: "Connect with us on LinkedIn",
		},
		{
			id: "github",
			icon: <FaGithub className='w-6 h-6' />,
			href: "https://github.com",
			label: "View our projects on GitHub",
		},
	];

	return (
		<footer className='bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-auto w-full'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{/* Company Info */}
					<div className='space-y-4 w-full'>
						<div className='flex items-center space-x-2'>
							<img
								src='images.unsplash.com/photo-1563906267088-b029e7101114'
								alt='Company Logo'
								className='w-10 h-10 rounded-full'
								onError={(
									e
								) => {
									e.target.onerror =
										null;
									e.target.src =
										"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23ccc'/%3E%3C/svg%3E";
								}}
							/>
							<h3 className='text-xl font-bold'>
								Cyber Dairy
							</h3>
						</div>
						<p className='text-gray-300 text-sm sm:text-base'>
							Empowering Development
							with innovative
							solutions for a better
							future.
						</p>
					</div>

					{/* Quick Links */}
					<div className='space-y-4 w-full'>
						<h4 className='text-lg font-semibold'>
							Quick Links
						</h4>
						<nav
							className='grid grid-cols-2 gap-2 sm:gap-4'
							aria-label='Footer Navigation'
						>
							{footerLinks.map(
								(link) => (
									<a
										key={
											link.id
										}
										href={
											link.href
										}
										onClick={(
											e
										) =>
											handleSmoothScroll(
												e,
												link.id
											)
										}
										className='text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md px-2 py-1 text-sm sm:text-base'
										aria-label={
											link.label
										}
									>
										{
											link.label
										}
									</a>
								)
							)}
						</nav>
					</div>

					{/* Social Links */}
					<div className='space-y-4 w-full'>
						<h4 className='text-lg font-semibold'>
							Connect With Us
						</h4>
						<div className='flex flex-wrap gap-4'>
							{socialLinks.map(
								(social) => (
									<a
										key={
											social.id
										}
										href={
											social.href
										}
										target='_blank'
										rel='noopener noreferrer'
										className='text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-full p-2'
										aria-label={
											social.label
										}
									>
										{
											social.icon
										}
									</a>
								)
							)}
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-8 pt-8 border-t border-gray-700'>
					<div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
						<p className='text-gray-300 text-xs sm:text-sm text-center sm:text-left'>
							© {currentYear}{" "}
							CyberDairy All rights
							reserved.
						</p>
						<div className='flex space-x-4 text-xs sm:text-sm text-gray-300'>
							<button
								className='hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md px-2 py-1'
								onClick={() =>
									window.scrollTo(
										{
											top: 0,
											behavior: "smooth",
										}
									)
								}
							>
								Back to Top
							</button>
						</div>
					</div>
				</div>

				{/* Loading State */}
				<div
					id='loading-indicator'
					className='hidden fixed bottom-4 right-4 bg-gray-800 p-3 rounded-full shadow-lg z-50'
				>
					<BiLoaderAlt
						className='w-6 h-6 animate-spin text-white'
						aria-label='Loading content'
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
