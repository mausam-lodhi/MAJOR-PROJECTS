import React, { useState } from "react";

const UploadForm = ({ onSubmit, type, buttonText, placeholder }) => {
	const [formData, setFormData] = useState({
		name: "",
		photo: null,
	});
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({
				...prev,
				photo: file,
			}));

			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.photo || !formData.name.trim()) {
			alert("Please provide both name and photo");
			return;
		}

		setLoading(true);
		try {
			const submitData = new FormData();
			submitData.append("photo", formData.photo);
			if (type === "student") {
				submitData.append("name", formData.name);
			}

			await onSubmit(submitData);

			// Reset form
			setFormData({ name: "", photo: null });
			setPreview(null);
			e.target.reset();
		} catch (error) {
			console.error("Upload error:", error);
			alert("Upload failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='upload-form'>
			<div className='form-group'>
				<label htmlFor='name'>{placeholder}:</label>
				<input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder={placeholder} required />
			</div>

			<div className='form-group'>
				<label htmlFor='photo'>Photo:</label>
				<input type='file' id='photo' accept='image/*' onChange={handleFileChange} required />
			</div>

			{preview && (
				<div className='preview-container'>
					<img src={preview} alt='Preview' className='preview-image' />
				</div>
			)}

			<button type='submit' disabled={loading} className='submit-btn'>
				{loading ? "Uploading..." : buttonText}
			</button>

			<style jsx>{`
				.upload-form {
					display: flex;
					flex-direction: column;
					gap: 1.5rem;
				}

				.form-group {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				label {
					font-weight: 600;
					color: #333;
				}

				input[type="text"],
				input[type="file"] {
					padding: 0.75rem;
					border: 2px solid #e1e5e9;
					border-radius: 8px;
					font-size: 1rem;
					transition: border-color 0.3s ease;
				}

				input[type="text"]:focus,
				input[type="file"]:focus {
					outline: none;
					border-color: #667eea;
					box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
				}

				.preview-container {
					text-align: center;
				}

				.preview-image {
					max-width: 300px;
					max-height: 300px;
					border-radius: 8px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				}

				.submit-btn {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
					border: none;
					padding: 1rem 2rem;
					border-radius: 8px;
					font-size: 1.1rem;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
				}

				.submit-btn:hover:not(:disabled) {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
				}

				.submit-btn:disabled {
					opacity: 0.7;
					cursor: not-allowed;
				}
			`}</style>
		</form>
	);
};

export default UploadForm;
