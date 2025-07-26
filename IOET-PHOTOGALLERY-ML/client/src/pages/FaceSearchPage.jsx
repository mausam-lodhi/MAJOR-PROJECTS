import React, { useState } from "react";
import FaceSearchForm from "../components/FaceSearchForm";
import MatchedPhotosGrid from "../components/MatchedPhotosGrid";
import { searchStudentPhotos } from "../api/studentAPI";

const FaceSearchPage = () => {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchedName, setSearchedName] = useState("");
	const [error, setError] = useState("");

	const handleSearch = async (studentName) => {
		setLoading(true);
		setError("");
		setSearchedName(studentName);

		try {
			const response = await searchStudentPhotos(studentName);

			// Handle new response format with enhanced search metadata
			const searchResult = response.data;

			if (searchResult.photos) {
				// New format with metadata
				setPhotos(searchResult.photos);
				console.log(`✅ Enhanced search results: ${searchResult.resultsCount} photos found`);
				console.log(`🔍 Search type: ${searchResult.searchType}`);
			} else {
				// Fallback for old format (array of photos)
				setPhotos(Array.isArray(searchResult) ? searchResult : []);
			}
		} catch (error) {
			console.error("Enhanced search error:", error);
			setError("Failed to search photos. Please try again with a different search term.");
			setPhotos([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='face-search-container'>
			<div className='hero-section'>
				<h2 className='page-title'>Smart Gallery Search</h2>
				<p className='page-subtitle'>Find any student in event photos using advanced AI face recognition technology</p>
			</div>

			<div className='search-card'>
				<div className='search-header'>
					<h2>🔍 Search for Students</h2>
					<p>Enter a student's name to find all event photos they appear in</p>
				</div>

				<FaceSearchForm onSearch={handleSearch} loading={loading} />

				{error && (
					<div className='error-message'>
						<i className='error-icon'>⚠️</i>
						<span>{error}</span>
					</div>
				)}
			</div>

			{loading && (
				<div className='loading-section'>
					<div className='loading-spinner'></div>
					<h3>Analyzing photos with AI...</h3>
					<p>Please wait while we search through the gallery</p>
				</div>
			)}

			{(photos.length > 0 || (searchedName && !loading)) && (
				<div className='results-section'>
					<MatchedPhotosGrid photos={photos} studentName={searchedName} />
				</div>
			)}

			<style jsx>{`
				.face-search-container {
					min-height: 100vh;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					padding: 2rem 1rem;
				}

				.hero-section {
					text-align: center;
					margin-bottom: 3rem;
					color: white;
				}

				.page-title {
					font-size: 3rem;
					font-weight: 700;
					margin-bottom: 1rem;
					text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
				}

				.page-subtitle {
					font-size: 1.2rem;
					opacity: 0.9;
					max-width: 600px;
					margin: 0 auto;
					line-height: 1.6;
				}

				.search-card {
					background: white;
					border-radius: 20px;
					padding: 2.5rem;
					margin: 0 auto 2rem;
					max-width: 800px;
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
				}

				.search-header {
					text-align: center;
					margin-bottom: 2rem;
				}

				.search-header h2 {
					font-size: 2rem;
					color: #333;
					margin-bottom: 0.5rem;
					font-weight: 600;
				}

				.search-header p {
					color: #666;
					font-size: 1.1rem;
					margin: 0;
				}

				.search-tips {
					background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
					border: 1px solid #e1e7ff;
					border-radius: 15px;
					padding: 2rem;
					margin-top: 2rem;
				}

				.search-tips h4 {
					margin: 0 0 1.5rem 0;
					color: #4f46e5;
					font-size: 1.3rem;
					font-weight: 600;
				}

				.search-tips ul {
					margin: 0;
					padding-left: 0;
					list-style: none;
				}

				.search-tips li {
					margin-bottom: 1rem;
					padding-left: 1.5rem;
					position: relative;
					color: #555;
					font-size: 1rem;
					line-height: 1.5;
				}

				.search-tips li::before {
					content: "✓";
					position: absolute;
					left: 0;
					color: #10b981;
					font-weight: bold;
				}

				.search-tips strong {
					color: #333;
					font-weight: 600;
				}

				.error-message {
					background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
					color: #dc2626;
					border: 1px solid #fecaca;
					padding: 1.5rem;
					border-radius: 12px;
					margin-top: 1.5rem;
					display: flex;
					align-items: center;
					gap: 0.75rem;
					font-weight: 500;
				}

				.error-icon {
					font-size: 1.2rem;
				}

				.loading-section {
					text-align: center;
					padding: 4rem 2rem;
					color: white;
					margin: 0 auto;
					max-width: 600px;
				}

				.loading-spinner {
					width: 60px;
					height: 60px;
					border: 4px solid rgba(255, 255, 255, 0.3);
					border-top: 4px solid white;
					border-radius: 50%;
					animation: spin 1s linear infinite;
					margin: 0 auto 2rem;
				}

				.loading-section h3 {
					font-size: 1.5rem;
					margin-bottom: 0.5rem;
					font-weight: 600;
				}

				.loading-section p {
					opacity: 0.8;
					font-size: 1.1rem;
				}

				.results-section {
					background: white;
					border-radius: 20px;
					padding: 2rem;
					margin: 0 auto;
					max-width: 1200px;
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
				}

				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}

				@media (max-width: 768px) {
					.face-search-container {
						padding: 1rem 0.5rem;
					}

					.page-title {
						font-size: 2.2rem;
					}

					.page-subtitle {
						font-size: 1rem;
						padding: 0 1rem;
					}

					.search-card {
						padding: 1.5rem;
						margin: 0 0.5rem 2rem;
						border-radius: 15px;
					}

					.search-header h2 {
						font-size: 1.6rem;
					}

					.search-tips {
						padding: 1.5rem;
					}

					.results-section {
						margin: 0 0.5rem;
						padding: 1.5rem;
						border-radius: 15px;
					}
				}

				@media (max-width: 480px) {
					.page-title {
						font-size: 1.8rem;
					}

					.search-card {
						padding: 1rem;
					}

					.search-tips {
						padding: 1rem;
					}
				}
			`}</style>
		</div>
	);
};

export default FaceSearchPage;
