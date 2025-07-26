import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/coming-soon-page.css";
import "../css/whatsapp-chat.css";
import "../css/bootstrap.css";
import "../css/fontawesome.css";
import "../css/login.css";
import "../css/style.css";

const ComingSoon = () => {
	const [loading, setLoading] = useState(true);
	const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	// Simulate loader
	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	// Initialize particles.js
	useEffect(() => {
		particlesJS("particles-js", {
			particles: {
				number: { value: 80, density: { enable: true, value_area: 800 } },
				color: { value: "#ffffff" },
				shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
				opacity: { value: 0.5, random: false },
				size: { value: 5, random: true },
				line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
				move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out" },
			},
			interactivity: {
				detect_on: "canvas",
				events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
			},
			retina_detect: true,
		});
	}, []);

	// Countdown timer
	useEffect(() => {
		// Set launch date - 30 days from now
		const targetDate = new Date();
		targetDate.setDate(targetDate.getDate() + 30);

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const timeDifference = targetDate.getTime() - now;

			if (timeDifference > 0) {
				const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

				setTimeLeft({ days, hours, minutes, seconds });
			} else {
				clearInterval(timer);
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='page-section'>
			{/* Loader */}
			{loading && (
				<div className='loader-wrapper' id='loader-wrapper'>
					<div className='loader'></div>
				</div>
			)}

			{/* Particles Background */}
			<div id='particles-js' className='particles-bg'></div>

			{/* Main Content */}
			<div className='content-detail'>
				{/* <div className='logo'>
					<img src='images/logo.png' alt='logo' />
				</div> */}

				{/* Countdown Timer */}
				<div id='timer'>
					<div className='date-box'>
						<div className='numbers'>{timeLeft.days}</div>
						<div className='text'>days</div>
					</div>
					<div className='date-box'>
						<div className='numbers'>{timeLeft.hours}</div>
						<div className='text'>hours</div>
					</div>
					<div className='date-box'>
						<div className='numbers'>{timeLeft.minutes}</div>
						<div className='text'>minutes</div>
					</div>
					<div className='date-box'>
						<div className='numbers'>{timeLeft.seconds}</div>
						<div className='text'>seconds</div>
					</div>
				</div>

				<h1 className='title'>
					We will <span>launch</span> soon.
				</h1>
				<p className='hero-counter-desc'>Be patient and stay tuned</p>
			</div>
		</div>
	);
};

export default ComingSoon;
