/* eslint-disable react/prop-types */
// import React from "react";

const AuthorsFilter = ({ authors, setSelectedAuthor }) => {
	return (
		<div
			style={{
				padding: "15px",
				borderRadius: "10px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
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
			<h3>Filter by Author</h3>
			{authors.map((author, index) => (
				<div
					key={index}
					style={{
						marginBottom: "1px",
						padding: "10px",
					}}
				>
					<label
						style={{
							cursor: "pointer",
							padding: "5px 16px 5px 5px",
						}}
						onMouseOver={(e) => {
							e.target.style.border =
								"1px solid transparent";
							e.target.style.borderRadius =
								"10px";
							e.target.style.paddingRight =
								"30px";
							e.target.style.paddingLeft =
								"10px";
							e.target.style.borderColor =
								"#555";
						}}
						onMouseOut={(e) => {
							e.target.style.border =
								"none";
							e.target.style.borderColor =
								"none";
						}}
					>
						<input
							type='radio'
							name='author'
							value={author}
							onChange={() =>
								setSelectedAuthor(
									author
								)
							}
							style={{
								marginRight:
									"8px",
							}}
						/>
						{author}
					</label>
				</div>
			))}
		</div>
	);
};

export default AuthorsFilter;
