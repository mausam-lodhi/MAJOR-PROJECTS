import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchHospitalsButton = ({ customClassName = "", buttonText = "Search Hospitals", onClick = () => {}, disabled = false, loading = false, size = "default" }) => {
	const [isHovered, setIsHovered] = useState(false);

	const getSizeClasses = () => {
		switch (size) {
			case "small":
				return "py-2 px-4 text-sm";
			case "large":
				return "py-4 px-8 text-lg";
			default:
				return "py-3 px-6 text-base";
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<button
				className={`group flex items-center justify-center gap-2 w-full md:w-auto
          ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}
          text-black ${getSizeClasses()} rounded-lg transition-all duration-300
          shadow-md hover:shadow-lg transform hover:-translate-y-0.7
          border border-gray-800 ${loading ? "opacity-5 cursor-wait" : ""}
          ${customClassName} hover:py-3.5`}
				style={{
					top: "350px",
					position: "relative",
				}}
				aria-label={buttonText}
				disabled={disabled || loading}
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				{loading ? (
					<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-black'></div>
				) : (
					<>
						<FaSearch
							className={`${isHovered ? "scale-110" : "scale-100"}
                transition-transform duration-300 ${size === "small" ? "text-sm" : size === "large" ? "text-xl" : "text-lg"}`}
						/>
						<span className='font-semibold tracking-wide'>{buttonText}</span>
					</>
				)}
			</button>
		</div>
	);
};

export default SearchHospitalsButton;
