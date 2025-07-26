import React, { useState } from "react";

const FaceSearchForm = ({ onSearch, loading }) => {
	const [studentName, setStudentName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const searchTerm = studentName.trim();
		if (searchTerm) {
			// Normalize and clean the search term for better matching
			const cleanedSearchTerm = searchTerm
				.replace(/\s+/g, " ") // Replace multiple spaces with single space
				.toLowerCase(); // Convert to lowercase for consistency

			console.log(`🔍 Searching for: "${searchTerm}" (normalized: "${cleanedSearchTerm}")`);
			onSearch(searchTerm); // Send original term to maintain user input format
		}
	};

	return (
		<form onSubmit={handleSubmit} className='search-form'>
			<div className='search-container'>
				<input type='text' value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder='Enter student name' className='search-input' required />
				<button type='submit' disabled={loading} className='search-btn'>
					{loading ? "🔍 Searching..." : "🔍 Search"}
				</button>
			</div>

			<style jsx>{`
				.search-form {
					margin-bottom: 2rem;
				}

				.search-container {
					display: flex;
					gap: 1rem;
					max-width: 600px;
					margin: 0 auto;
				}

				.search-input {
					flex: 1;
					padding: 1rem;
					border: 2px solid #e1e5e9;
					border-radius: 12px;
					font-size: 1.1rem;
					transition: all 0.3s ease;
				}

				.search-input:focus {
					outline: none;
					border-color: #667eea;
					box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
				}

				.search-btn {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
					border: none;
					padding: 1rem 2rem;
					border-radius: 12px;
					font-size: 1.1rem;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
					white-space: nowrap;
				}

				.search-btn:hover:not(:disabled) {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
				}

				.search-btn:disabled {
					opacity: 0.7;
					cursor: not-allowed;
				}

				@media (max-width: 768px) {
					.search-container {
						flex-direction: column;
					}
				}
			`}</style>
		</form>
	);
};

export default FaceSearchForm;
