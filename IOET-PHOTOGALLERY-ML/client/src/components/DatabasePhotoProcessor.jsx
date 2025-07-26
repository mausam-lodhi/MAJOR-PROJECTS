import React, { useState, useEffect } from "react";
import API from "../utils/api";

const DatabasePhotoProcessor = () => {
	const [processing, setProcessing] = useState(false);
	const [stats, setStats] = useState(null);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	// Fetch database stats on component mount
	useEffect(() => {
		fetchDatabaseStats();
	}, []);

	const fetchDatabaseStats = async () => {
		try {
			setLoading(true);
			const response = await API.get("/api/reprocess/database-stats");
			setStats(response.data);
		} catch (error) {
			console.error("Error fetching database stats:", error);
			setMessage("❌ Failed to fetch database statistics");
		} finally {
			setLoading(false);
		}
	};
	const processAllPhotos = async () => {
		try {
			setProcessing(true);
			setMessage("🚀 Starting face recognition processing for all photos...");

			const response = await API.post("/api/reprocess/all-photos");
			setMessage("✅ Face recognition processing started! This may take a while. Check the server logs for progress.");

			// Refresh stats after a delay
			setTimeout(() => {
				fetchDatabaseStats();
			}, 5000);
		} catch (error) {
			console.error("Error processing photos:", error);
			setMessage("❌ Failed to start photo processing");
		} finally {
			setProcessing(false);
		}
	};

	const resetMessage = () => {
		setTimeout(() => setMessage(""), 5000);
	};

	useEffect(() => {
		if (message) {
			resetMessage();
		}
	}, [message]);

	return (
		<div className='database-processor'>
			<div className='processor-header'>
				<h2>Database Photo Recognition</h2>
				<p>Process all photos in your database for face recognition and update detected faces</p>
			</div>

			{message && <div className={`message ${message.includes("✅") ? "success" : message.includes("❌") ? "error" : "info"}`}>{message}</div>}

			{loading ? (
				<div className='loading'>Loading database statistics...</div>
			) : (
				stats && (
					<div className='stats-container'>
						<h3>Database Statistics</h3>
						<div className='stats-grid'>
							<div className='stat-item'>
								<div className='stat-number'>{stats.totalPhotos}</div>
								<div className='stat-label'>Total Photos</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>{stats.photosWithFaces}</div>
								<div className='stat-label'>Photos with Detected Faces</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>{stats.photosWithoutFaces}</div>
								<div className='stat-label'>Photos Pending Processing</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>{stats.totalStudents}</div>
								<div className='stat-label'>Total Students</div>
							</div>
						</div>
						<div className='processing-coverage'>
							<strong>Processing Coverage: {stats.processingCoverage}</strong>
						</div>
					</div>
				)
			)}

			<div className='action-container'>
				<button onClick={processAllPhotos} disabled={processing} className='process-btn'>
					{processing ? "Processing..." : "🔍 Process All Photos for Face Recognition"}
				</button>

				<button onClick={fetchDatabaseStats} disabled={loading} className='refresh-btn'>
					🔄 Refresh Statistics
				</button>
			</div>

			{stats && stats.samplePhotosWithFaces && stats.samplePhotosWithFaces.length > 0 && (
				<div className='sample-photos'>
					{/* <h4>Sample Photos with Detected Faces:</h4>
					<div className='sample-list'>
						{stats.samplePhotosWithFaces.map((photo) => (
							<div key={photo._id} className='sample-item'>
								<strong>Photo ID:</strong> {photo._id}
								<br />
								<strong>Detected:</strong> {photo.detectedFaces.join(", ")}
								<br />
								<strong>Uploaded:</strong> {new Date(photo.uploadedTime).toLocaleDateString()}
							</div>
						))}
					</div> */}
				</div>
			)}

			<style jsx>{`
				.database-processor {
					max-width: 800px;
					margin: 2rem auto;
					padding: 2rem;
					background: white;
					border-radius: 12px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				}

				.processor-header {
					text-align: center;
					margin-bottom: 2rem;
				}

				.processor-header h2 {
					color: #333;
					margin-bottom: 0.5rem;
				}

				.processor-header p {
					color: #666;
					margin: 0;
				}

				.message {
					padding: 1rem;
					border-radius: 8px;
					margin-bottom: 1.5rem;
					font-weight: 500;
				}

				.message.success {
					background: #d4edda;
					color: #155724;
					border: 1px solid #c3e6cb;
				}

				.message.error {
					background: #f8d7da;
					color: #721c24;
					border: 1px solid #f5c6cb;
				}

				.message.info {
					background: #d1ecf1;
					color: #0c5460;
					border: 1px solid #bee5eb;
				}

				.loading {
					text-align: center;
					padding: 2rem;
					color: #666;
				}

				.stats-container {
					background: #f8f9fa;
					padding: 1.5rem;
					border-radius: 8px;
					margin-bottom: 2rem;
				}

				.stats-container h3 {
					margin: 0 0 1rem 0;
					color: #333;
				}

				.stats-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
					gap: 1rem;
					margin-bottom: 1rem;
				}

				.stat-item {
					text-align: center;
					background: white;
					padding: 1rem;
					border-radius: 8px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}

				.stat-number {
					font-size: 2rem;
					font-weight: bold;
					color: #667eea;
				}

				.stat-label {
					font-size: 0.9rem;
					color: #666;
					margin-top: 0.5rem;
				}

				.processing-coverage {
					text-align: center;
					padding: 1rem;
					background: white;
					border-radius: 8px;
					color: #333;
				}

				.action-container {
					display: flex;
					gap: 1rem;
					justify-content: center;
					margin-bottom: 2rem;
				}

				.process-btn,
				.refresh-btn {
					padding: 1rem 2rem;
					border: none;
					border-radius: 8px;
					font-size: 1rem;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
				}

				.process-btn {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
				}

				.refresh-btn {
					background: #6c757d;
					color: white;
				}

				.process-btn:hover:not(:disabled),
				.refresh-btn:hover:not(:disabled) {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
				}

				.process-btn:disabled,
				.refresh-btn:disabled {
					opacity: 0.7;
					cursor: not-allowed;
					transform: none;
				}

				.sample-photos {
					background: #f8f9fa;
					padding: 1.5rem;
					border-radius: 8px;
				}

				.sample-photos h4 {
					margin: 0 0 1rem 0;
					color: #333;
				}

				.sample-list {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.sample-item {
					background: white;
					padding: 1rem;
					border-radius: 6px;
					font-size: 0.9rem;
					line-height: 1.6;
				}

				@media (max-width: 768px) {
					.database-processor {
						margin: 1rem;
						padding: 1rem;
					}

					.action-container {
						flex-direction: column;
					}

					.stats-grid {
						grid-template-columns: repeat(2, 1fr);
					}
				}
			`}</style>
		</div>
	);
};

export default DatabasePhotoProcessor;
