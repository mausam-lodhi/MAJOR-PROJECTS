/* eslint-disable react/prop-types */
// import React from "react";

const CategoriesDropdown = ({ categories, setSelectedCategory }) => {
	return (
		<div
			style={{
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
				padding: "15px",
				margin: "0 15vw 0",
				borderRadius: "8px",
				position: "unset",
				border: "2px solid transparent", // Transparent border to avoid layout shift
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = "green"; // Parent hover effect
				e.currentTarget.style.boxShadow =
					"0 4px 8px rgba(0, 0, 0, 0.6)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor =
					"transparent"; // Reset styles
				e.currentTarget.style.boxShadow =
					"0 4px 8px rgba(0, 0, 0, 0.3)";
			}}
		>
			<h3>Select a Category</h3>
			<select
				onChange={(e) =>
					setSelectedCategory(e.target.value)
				}
				style={{
					width: "100%",
					padding: "8px",
					borderRadius: "5px",
					border: "2px solid #ddd",
					outline: "none",
					cursor: "pointer",
					transition: "border-color 0.3s ease",
				}}
				onMouseOver={(e) => {
					e.target.style.borderColor = "#555";
					e.target.style.boxShadow =
						"0 4px 8px rgba(0, 0, 0, 0.4)";
				}}
				onMouseOut={(e) => {
					e.target.style.borderColor = "#555";
					e.target.style.boxShadow =
						"0 4px 8px rgba(0, 0, 0, 0)";
				}}
			>
				<option value=''>Choose a Category</option>
				{categories.map((category, index) => (
					<option key={index} value={category}>
						{category}
					</option>
				))}
			</select>
		</div>
	);
};

export default CategoriesDropdown;
