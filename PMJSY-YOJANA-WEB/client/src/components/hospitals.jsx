import React, { useState, useEffect } from "react";
import { FaHospital } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
// Header Component
const Header = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<header style={{ height: "10vh", display: "flex" }} className='fixed top-0 left-0 w-full  bg-white shadow-md z-50 mb-2'>
			<div className='container mx-auto px-4 h-full'>
				<div className='flex items-center justify-between h-full md:flex-row flex-col md:space-y-0 space-y-2'>
					<div className='flex items-center'>
						<Icon />
						<Text text='PMJAY Hospital Search' />
					</div>
					<InputField value={searchTerm} onChange={handleSearch} placeholder='Search hospitals...' />
					{children}
				</div>
			</div>
		</header>
	);
};

const Icon = () => {
	return (
		<div className='w-10 h-10 flex items-center justify-center bg-white rounded-full text-black'>
			<FaHospital className='w-5 h-5' />
		</div>
	);
};

const Text = ({ text }) => {
	return <h1 className='text-2xl md:text-[24px] text-gray-800 font-poppins font-semibold '>{text}</h1>;
};

const InputField = ({ value, onChange, placeholder }) => {
	return (
		<div className='relative w-full md:w-[400px]'>
			<input
				type='text'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className='w-full h-[38px] px-4 py-2 text-gray-700 bg-white border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
				aria-label='Search input field'
			/>
			<div className='absolute inset-y-0 right-0 flex items-center pr-3'>
				<FaHospital className='w-4 h-4 text-gray-400' />
			</div>
		</div>
	);
};

const buttonStyles = {
	cursor: "pointer",
	top: "221px",
	left: "514px",
	width: "117px",
	height: "36px",
	padding: "0px 8px",
	border: "0",
	boxSizing: "border-box",
	borderRadius: "2px",
	backgroundColor: "#407294",
	color: "#ffffff",
	fontSize: "14px",
	fontFamily: "Poppins",
	lineHeight: "20px",
	outline: "none",
};

const HospitalSearch = () => {
	const [hospitals, setHospitals] = useState([]);
	const { selectedHospital } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchHospitalData = async () => {
			try {
				const url = selectedHospital ? `http://localhost:8080/hospitals/search/${selectedHospital}` : "http://localhost:8080/hospitals";
				const response = await axios.get(url);
				setHospitals(response.data);
			} catch (error) {
				console.error("Error fetching hospital data:", error);
			}
		};
		fetchHospitalData();
	}, [selectedHospital]);

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-grow p-6' style={{ backgroundColor: "#f4f4f4", marginTop: "10vh" }}>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{hospitals.length === 0 ? (
						<p>No hospitals found.</p>
					) : (
						hospitals.map((hospital, index) => (
							<div
								key={index}
								className='shadow-md p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg mb-6'
								style={{ backgroundColor: "#fff" }}>
								<h2 className='text-lg font-semibold'>{hospital.hospital_name}</h2>
								<p className='text-sm text-gray-700'>Contact: {hospital.nodal_person_contact_no}</p>
								<p className='text-sm text-gray-700'>Email: {hospital.nodal_person_email}</p>
								<p className='text-sm text-gray-700'>Services: </p>
								{hospital.empaneled_specialities.slice(0, 2).map((service, index) => (
									<p key={index} className='text-sm text-gray-700'>
										<a href='/'>{service}</a>
									</p>
								))}
								<button
									className='mt-4'
									style={buttonStyles}
									onClick={() => {
										navigate(`/home/search/hospitals/details/${hospital.hospital_name}`);
									}}>
									View Details
								</button>
							</div>
						))
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

// Footer Component
const styles = {
	Footer: {
		width: "100%",
		padding: "20px 0",
		height: "150px",
		backgroundColor: "#f8f8f8",
		borderTop: "1px solid #e7e7e7",
	},
	SectionTitle: {
		color: "#030303",
		fontSize: "18px",
		fontFamily: "Poppins",
		fontWeight: 700,
		lineHeight: "28px",
		marginBottom: "10px",
	},
	LinkText: {
		color: "#030303",
		fontSize: "14px",
		fontFamily: "Poppins",
		lineHeight: "20px",
		cursor: "pointer",
		marginBottom: "5px",
		textDecoration: "none",
	},
	Container: {
		width: "100%",
		maxWidth: "1200px",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		padding: "0 20px",
	},
	LeftSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	RightSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
};

const Footer = () => {
	return (
		<div style={styles.Footer}>
			<div style={styles.Container}>
				<div style={styles.LeftSection}>
					<div style={styles.SectionTitle}>Navigation</div>
					<a href='/' style={styles.LinkText}>
						Home
					</a>
					<a href='/home/search' style={styles.LinkText}>
						Search
					</a>
					<a href='/contact' style={styles.LinkText}>
						Contact Us
					</a>
				</div>
				<div style={styles.RightSection}>
					<div style={styles.SectionTitle}>Contact Information</div>
					<a href='mailto:harprasadlodhi1984@gmal.com' style={styles.LinkText}>
						Email: harprasadlodhi1984@gmal.com
					</a>
					<a href='tel:+911234567890' style={styles.LinkText}>
						Phone: +91-1234567890
					</a>
				</div>
			</div>
		</div>
	);
};

export default HospitalSearch;
