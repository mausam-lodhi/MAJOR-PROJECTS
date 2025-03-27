import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/mainPage.css";

const IconComponent = () => (
	<svg className='icon' viewBox='0 0 448 512'>
		<path d='M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z' />
	</svg>
);

const Header = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='header'>
			<div className='left-section'>
				{props.icon && <IconComponent />}
				<div className='large-text'>{props.title ?? "PMJAY Hospital Search"}</div>
			</div>
			<div className={`right-section ${isMenuOpen ? "menu-open" : ""}`}>{props.children}</div>
			{window.innerWidth <= 768 && (
				<button onClick={() => setIsMenuOpen(!isMenuOpen)} className='menu-button'>
					☰
				</button>
			)}
		</div>
	);
};

const Text = ({ text, variant }) => {
	let className = "text";
	if (variant === "large") className = "large-text";

	return <div className={className}>{text}</div>;
};

const Icon = (props) => {
	return props.icon ? <props.icon className='icon' /> : <IconComponent />;
};

const Body = () => {
	const navigate = useNavigate();
	const [hover, setHover] = useState(false);

	return (
		<div className='container'>
			{/* Welcome Text */}
			<div className='text-center'>
				<p className='welcome-text'>Welcome to PMJAY Scheme</p>
				<p className='description-text'>
					Discover how the Pradhan Mantri Jan Arogya Yojana can benefit you and your family. It aims to provide healthcare access to millions across India. Learn more
					about its benefits below.
				</p>
			</div>

			{/* Button */}
			<button className={`button ${hover ? "button-hover" : ""}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => navigate("/home/search")}>
				<span className='button-text'>
					<span className='button-text-inner'>Start Searching for Hospitals</span>
				</span>
			</button>

			{/* Cards Section */}
			<div className='card-container'>
				{/* Card 1 */}
				<div className='card'>
					<div
						className='image-container'
						style={{
							backgroundImage: "url(https://assets.api.uizard.io/api/cdn/stream/96ccf2b2-aca4-4133-b992-327035b0b381.png)",
						}}></div>
					<div className='card-heading'>Wide Coverage</div>
					<div className='card-body'>Covering over 10 crore families, PMJAY is one of the largest healthcare schemes in the world.</div>
				</div>

				{/* Card 2 */}
				<div className='card'>
					<div
						className='image-container'
						style={{
							backgroundImage: "url(https://assets.api.uizard.io/api/cdn/stream/9910b72b-322e-4ee0-bb7b-c663be06d0c4.png)",
						}}></div>
					<div className='card-heading'>Financial Security</div>
					<div className='card-body'>Provides up to INR 5 lakh per family per year, offering financial protection against health expenses.</div>
				</div>

				{/* Card 3 */}
				<div className='card'>
					<div
						className='image-container'
						style={{
							backgroundImage: "url(https://assets.api.uizard.io/api/cdn/stream/96ccf2b2-aca4-4133-b992-327035b0b381.png)",
						}}></div>
					<div className='card-heading'>Ease of Access</div>
					<div className='card-body'>Access healthcare services at over 23,000 hospitals across the nation with ease.</div>
				</div>
			</div>
		</div>
	);
};

const Footer = () => {
	const navigate = useNavigate();
	return (
		<div className='footer'>
			<div className='section'>
				<div className='header-text'>Contact Us</div>
				<div>
					<div className='text' style={{ fontSize: "16px" }}>
						Email: support@pmjay.gov.in
					</div>
					<div className='text' style={{ fontSize: "16px" }}>
						Phone: 1800-11-22-33
					</div>
				</div>
			</div>
			<div className='section'>
				<div className='header-text'>Quick Links</div>
				<div>
					<button className='button-link'>Contact us</button>
				</div>
				<div>
					<button className='button-link' onClick={() => navigate("/home/search")}>
						Find a Hospital
					</button>
				</div>
			</div>
		</div>
	);
};

const MainPage = () => {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col min-h-screen'>
			<Header title='PMJAY Hospital Search' icon={IconComponent}>
				<button className='main-button' onClick={() => alert("Already on Home")}>
					Home
				</button>
				<button className='main-button' onClick={() => navigate("/home/search")}>
					Search
				</button>
				<button className='main-button' onClick={() => alert("First search something")}>
					Result
				</button>
			</Header>
			<Body />
			<Footer />
		</div>
	);
};

export default MainPage;
