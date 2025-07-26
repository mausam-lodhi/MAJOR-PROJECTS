import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import { uploadStudentPhoto } from "../api/studentAPI";
import "./UploadPage.css";

const UploadPage = () => {
	const [activeTab, setActiveTab] = useState("student");
	const [message, setMessage] = useState("");

	const handleStudentUpload = async (formData) => {
		try {
			const response = await uploadStudentPhoto(formData);
			setMessage("✅ Student photo uploaded successfully! Reprocessing existing photos in background...");
			setTimeout(() => setMessage(""), 5000);
		} catch (error) {
			setMessage("❌ Failed to upload student photo");
			setTimeout(() => setMessage(""), 3000);
			o;
		}
	};

	return (
		<div className='upload-page-container'>
			<div className='upload-page-header'>
				<h1 className='upload-page-title'>Upload Photos</h1>
				<p className='upload-page-subtitle'>Manage your photo uploads for face recognition</p>
			</div>

			{message && <div className={`upload-message ${message.includes("✅") ? "upload-message--success" : "upload-message--error"}`}>{message}</div>}

			<div className='upload-card'>
				<div className='upload-tabs'>
					<button className={`upload-tab ${activeTab === "student" ? "upload-tab--active" : ""}`} onClick={() => setActiveTab("student")}>
						<span className='upload-tab-icon'>👤</span>
						<span className='upload-tab-text'>Upload Student Photo</span>
					</button>
				</div>

				<div className='upload-tab-content'>
					<div className='upload-section'>
						<div className='upload-section-header'>
							<h3 className='upload-section-title'>Upload Student Photo</h3>
							<p className='upload-section-description'>Upload a clear photo of a student for face recognition training.</p>
						</div>
						<UploadForm onSubmit={handleStudentUpload} type='student' buttonText='Upload Student Photo' placeholder='Student Name' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadPage;
