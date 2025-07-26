import React from "react";

const MatchedPhotosGrid = ({ photos, studentName }) => {
	if (!photos || photos.length === 0) {
		return (
			<div className='no-results'>
				<div className='no-results-icon'>📷</div>
				<h3>No photos found</h3>
				<p>{studentName ? `No event photos found containing ${studentName}` : "Search for a student to see their photos"}</p>

				<style jsx>{`
					.no-results {
						text-align: center;
						padding: 3rem;
						color: #666;
					}

					.no-results-icon {
						font-size: 4rem;
						margin-bottom: 1rem;
					}

					.no-results h3 {
						margin: 0 0 0.5rem 0;
						color: #333;
					}

					.no-results p {
						margin: 0;
					}
				`}</style>
			</div>
		);
	}

	return (
		<div className='photos-grid'>
			<div className='results-header'>
				<h3>
					Found {photos.length} photo{photos.length !== 1 ? "s" : ""} containing {studentName}
				</h3>
			</div>

			<div className='grid'>
				{photos.map((photo, index) => (
					<div key={photo._id || index} className='photo-card'>
						<div className='photo-container'>
							<img src={photo.imageUrl} className='photo-image' loading='lazy' />
							<div className='photo-overlay'>
								<div className='photo-info'>
									<p>{new Date(photo.uploadedTime).toLocaleDateString()}</p>
									{photo.detectedFaces && photo.detectedFaces.length > 0 && (
										<div className='detected-faces'>
											{/* <small>Also found: {photo.detectedFaces.filter((name) => name !== studentName).join(", ")}</small> */}
											{photo.category && (
												<small>
													{photo.category} , {photo.likes}❤️ , {photo.comments} 💬
												</small>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
				.photos-grid {
					margin-top: 2rem;
				}

				.results-header {
					text-align: center;
					margin-bottom: 2rem;
				}

				.results-header h3 {
					color: #333;
					margin: 0;
					font-size: 1.5rem;
				}

				.grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
					gap: 1.5rem;
				}

				.photo-card {
					background: white;
					border-radius: 12px;
					overflow: hidden;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
					transition: all 0.3s ease;
				}

				.photo-card:hover {
					transform: translateY(-4px);
					box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
				}

				.photo-container {
					position: relative;
					width: 100%;
					height: 250px;
					overflow: hidden;
				}

				.photo-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
				}

				.photo-card:hover .photo-image {
					transform: scale(1.05);
				}

				.photo-overlay {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
					color: white;
					padding: 1.5rem 1rem 1rem;
					transform: translateY(100%);
					transition: transform 0.3s ease;
				}

				.photo-card:hover .photo-overlay {
					transform: translateY(0);
				}

				.photo-info h4 {
					margin: 0 0 0.5rem 0;
					font-size: 1.2rem;
					font-weight: 600;
				}

				.photo-info p {
					margin: 0 0 0.5rem 0;
					opacity: 0.9;
				}

				.detected-faces {
					margin-top: 0.5rem;
				}

				.detected-faces small {
					opacity: 0.8;
					font-size: 0.85rem;
				}

				@media (max-width: 768px) {
					.grid {
						grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
						gap: 1rem;
					}

					.photo-container {
						height: 200px;
					}
				}
			`}</style>
		</div>
	);
};

export default MatchedPhotosGrid;
