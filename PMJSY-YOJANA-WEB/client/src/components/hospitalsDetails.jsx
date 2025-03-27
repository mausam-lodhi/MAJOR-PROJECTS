import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaHospital, FaThumbsUp, FaTimes, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const styles = {
	Icon: {
		color: "#407294",
		fill: "#407294",
		fontSize: "1.3125rem",
		width: "1.3125rem",
		height: "2rem",
		marginRight: "0.625rem",
	},
};

const IconComponent = () => (
	<svg style={styles.Icon} viewBox='0 0 448 512'>
		<path d='M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z' />
	</svg>
);

const HospitalInformation = () => {
	const { hospitalName } = useParams();
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [isLiked, setIsLiked] = useState(false);
	const [hospitalData, setHospitalData] = useState([]);
	const apiKey = "{{GOOGLE_MAPS_API_KEY}}";
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};
	const center = {
		lat: -3.745,
		lng: -38.523,
	};
	useEffect(() => {
		const getHospitalData = async () => {
			try {
				const res = await axios.get(`http://localhost:8080/hospitals/search/details/${hospitalName}`);
				setHospitalData(res.data);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		getHospitalData();
	}, [hospitalName]);

	const handleSubmitFeedback = (e) => {
		e.preventDefault();
		setFeedback("");
		setShowFeedback(false);
	};

	const handleLike = () => {
		setIsLiked(!isLiked);
	};

	if (!hospitalData) {
		return <div>Loading...</div>;
	}

	return (
		<div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{hospitalData.map((hospital, index) => (
						<React.Fragment key={index}>
							<div className='lg:w-1/2 bg-white rounded-xl shadow-lg p-6'>
								<div className='mb-8'>
									<div className='flex items-center justify-between mb-4'>
										<div className='flex items-center gap-4'>
											<FaHospital className='text-blue-600 text-3xl' />
											<h1 className='text-3xl font-bold text-gray-900'>{hospital.hospital_name}</h1>
										</div>
										<button
											onClick={handleLike}
											className={`p-2 rounded-full ${
												isLiked ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50"
											} hover:bg-gray-100 transition-colors`}>
											<FaHeart className='text-xl' />
										</button>
									</div>
									<div className='space-y-4'>
										<div className='flex items-center gap-3'>
											<FaPhone className='text-blue-600' />
											<span className='text-gray-700'>{hospital.nodal_person_contact_no}</span>
										</div>
										<div className='flex items-center gap-3'>
											<FaEnvelope className='text-blue-600' />
											<span className='text-gray-700'>{hospital.nodal_person_email}</span>
										</div>
									</div>
								</div>
								<div className='mb-8'>
									<h2 className='text-2xl font-semibold text-gray-900 mb-4'>Empaneled Specialties</h2>
									<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
										{hospital.empaneled_specialities &&
											hospital.empaneled_specialities.slice(0, 6).map((specialty, index) => (
												<div key={index} className='bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center'>
													{specialty}
												</div>
											))}
									</div>
								</div>
								<div className='mt-6'>
									<button
										onClick={() => setShowFeedback(!showFeedback)}
										className='flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
										<FaThumbsUp />
										Give Feedback
									</button>
									{showFeedback && (
										<div className='mt-6 bg-gray-50 p-6 rounded-lg relative'>
											<button
												onClick={() => setShowFeedback(false)}
												className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'>
												<FaTimes />
											</button>
											<form onSubmit={handleSubmitFeedback}>
												<textarea
													value={feedback}
													onChange={(e) => setFeedback(e.target.value)}
													placeholder='Share your experience...'
													className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
													rows='4'
												/>
												<button
													type='submit'
													className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
													Submit Feedback
												</button>
											</form>
										</div>
									)}
								</div>
							</div>
							<div className='lg:w-1/2 bg-white rounded-xl shadow-lg p-6'>
								<h2 className='text-2xl font-semibold text-gray-900 mb-4'>Location</h2>
								<div className='bg-gray-100 rounded-lg h-[500px] flex items-center justify-center'>
									<p className='text-gray-500 text-center'>
										Map Integration
										<br />
										Coming Soon
										<LoadScript googleMapsApiKey={apiKey}>
											<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
												{/* Add any additional components, like markers, here */}
											</GoogleMap>
										</LoadScript>
									</p>
								</div>
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default HospitalInformation;
