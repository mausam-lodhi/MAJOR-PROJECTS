import React, { useEffect, useState } from "react";
import SearchHospitalsButton from "./searchHospitalButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
	Header: {
		top: "0",
		left: "0",
		width: "100%",
		height: "1rem",
		backgroundColor: "#ffffff",
		boxShadow: "0 0.25rem 0.375rem rgba(0,0,0,0.1)",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "0 1.25rem",
		boxSizing: "border-box",
		fontFamily: "Poppins",
		fontSize: "1.5rem",
		transition: "all 0.3s ease",
	},
	LeftSection: {
		display: "flex",
		alignItems: "center",
	},
	RightSection: {
		display: "flex",
		gap: "1rem",
	},
	Icon: {
		color: "#407294",
		fill: "#407294",
		fontSize: "1.3125rem",
		width: "1.3125rem",
		height: "2rem",
		marginRight: "0.625rem",
	},
	Button: {
		cursor: "pointer",
		width: "74px",
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
	},
	ContactButton: {
		cursor: "pointer",
		width: "91px",
		height: "38px",
		padding: "0px 8px",
		border: "0.8px solid #030303",
		boxSizing: "border-box",
		borderRadius: "2px",
		backgroundColor: "transparent",
		color: "#030303",
		fontSize: "14px",
		fontFamily: "Poppins",
		lineHeight: "20px",
		outline: "none",
	},
	Footer: {
		position: "fixed",
		bottom: "0",
		width: "100%",
		height: "80px",
		backgroundColor: "#d3d3d3",
		padding: "8px 0",
		textAlign: "center",
	},
	Text: {
		color: "#030303",
		fontSize: "14px",
		fontFamily: "Poppins",
		lineHeight: "20px",
		margin: "10px 0",
	},
	LinksContainer: {
		display: "flex",
		justifyContent: "center",
		gap: "15px",
		marginTop: "10px",
	},
	Link: {
		color: "#030303",
		fontSize: "14px",
		fontFamily: "Poppins",
		lineHeight: "20px",
		cursor: "pointer",
	},
	TextBody: {
		color: "#030303",
		fontSize: "1.5rem",
		fontFamily: "Poppins",
		lineHeight: "2rem",
	},
	Dropdown: {
		cursor: "pointer",
		width: "16.6875rem",
		height: "2.4375rem",
		padding: "0 0.5rem",
		border: "0.8px solid #858585",
		boxSizing: "border-box",
		borderRadius: "2px",
		backgroundColor: "#ffffff",
		color: "#8a8a8a",
		fontSize: "0.875rem",
		fontFamily: "Poppins",
		lineHeight: "2.4rem",
		outline: "none",
		zIndex: "10",
	},
	Input: {
		width: "14.6875rem",
		height: "2.4375rem",
		padding: "0 0.5rem",
		border: "0.8px solid #858585",
		boxSizing: "border-box",
		borderRadius: "2px",
		backgroundColor: "#ffffff",
		color: "#94a3b8",
		fontSize: "0.875rem",
		fontFamily: "Poppins",
		lineHeight: "2.4rem",
		outline: "none",
	},
	FilterText: {
		color: "#030303",
		fontSize: "0.875rem",
		fontFamily: "Poppins",
		lineHeight: "1.25rem",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "0 1rem",
		boxSizing: "border-box",
	},
	searchRow: {
		display: "flex",
		justifyContent: "center",
		gap: "1.25rem",
		marginTop: "1.25rem",
		flexWrap: "wrap",
	},
	filterRow: {
		display: "flex",
		justifyContent: "center",
		gap: "1.25rem",
		marginTop: "1.25rem",
		flexWrap: "wrap",
	},
};

const IconComponent = () => (
	<svg style={styles.Icon} viewBox='0 0 448 512'>
		<path d='M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z' />
	</svg>
);

const Header = ({ title, icon: Icon }) => {
	const isMobile = window.innerWidth <= 768;
	const navigate = useNavigate();
	return (
		<div
			style={{
				...styles.Header,
				flexDirection: isMobile ? "column" : "row",
				height: isMobile ? "auto" : "4rem",
				fontSize: isMobile ? "1rem" : "1.5rem",
				padding: isMobile ? "0.625rem" : "0 1.25rem",
			}}>
			<div
				style={{
					...styles.LeftSection,
					marginBottom: isMobile ? "0.625rem" : "0",
				}}>
				{Icon && <Icon />}
				<div>{title ?? "PMJAY Hospital Search"}</div>
			</div>
			<div style={styles.RightSection}>
				<button
					style={{
						...styles.Button,
						width: isMobile ? "64px" : "74px",
						height: isMobile ? "32px" : "36px",
						fontSize: isMobile ? "12px" : "14px",
					}}
					onClick={() => navigate("/home")}>
					Home
				</button>
				<button
					style={{
						...styles.ContactButton,
						width: isMobile ? "80px" : "91px",
						height: isMobile ? "34px" : "38px",
						fontSize: isMobile ? "12px" : "14px",
					}}>
					Contact
				</button>
			</div>
		</div>
	);
};

const Body = () => {
	const [states, setStates] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [hospitals, setHospitals] = useState([]);
	const [selectedState, setSelectedState] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedHospital, setSelectedHospital] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:8080/home/states").then((res) => {
			setStates(res.data);
		});
	}, []);

	const fetchDistricts = (stateId) => {
		axios.get(`http://localhost:8080/districts/${stateId}`).then((res) => {
			setDistricts(res.data);
		});
	};

	const fetchHospitals = (districtId) => {
		axios.get(`http://localhost:8080/hospitals/${districtId}`).then((res) => {
			setHospitals(res.data);
		});
	};

	return (
		<div style={styles.container}>
			<div style={styles.TextBody}>Find a Hospital</div>
			<div style={styles.searchRow}>
				<select
					style={styles.Dropdown}
					value={selectedState}
					onChange={(e) => {
						setSelectedState(e.target.value);
						setDistricts([]);
						setSelectedDistrict("");
						setSelectedHospital("");
						fetchDistricts(e.target.value);
					}}>
					<option value='' disabled hidden>
						Select State
					</option>
					{states.map((state) => (
						<option key={state.state_id} value={state.state_id}>
							{state.state_name}
						</option>
					))}
				</select>

				<select
					style={styles.Dropdown}
					value={selectedDistrict}
					onChange={(e) => {
						setSelectedDistrict(e.target.value);
						setHospitals([]);
						setSelectedHospital("");
						fetchHospitals(e.target.value);
					}}>
					<option value='' disabled hidden>
						Select District
					</option>
					{districts.map((district) => (
						<option key={district.district_id} value={district.district_id}>
							{district.district_name}
						</option>
					))}
				</select>

				<select
					style={styles.Dropdown}
					value={selectedHospital}
					onChange={(e) => {
						setSelectedHospital(e.target.value);
					}}>
					<option value=''>Select Hospital</option>
					{hospitals.map((hospital) => (
						<option key={hospital.hospital_id} value={hospital.hospital_name}>
							{hospital.hospital_name}
						</option>
					))}
				</select>
			</div>
			<button
				style={{ marginTop: "-17rem", zIndex: "0" }}
				onClick={() => {
					navigate(`/home/search/hospitals/${selectedHospital}`);
				}}>
				<SearchHospitalsButton />
			</button>
		</div>
	);
};

const Footer = () => (
	<div style={styles.Footer}>
		<div style={styles.Text}>© 2023 PMJAY Hospital Search. All rights reserved.</div>
		<div style={styles.LinksContainer}>
			<div style={styles.Link}>Privacy Policy</div>
			<div style={styles.Link}>Terms of Service</div>
			<div style={styles.Link}>Help</div>
		</div>
	</div>
);

const SearchPage = () => (
	<div>
		<Header title='PMJAY Hospital Search' icon={IconComponent} />
		<Body />
		<Footer />
	</div>
);

export default SearchPage;
