import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiFile, FiImage, FiVideo, FiLock } from "react-icons/fi";
import { FaGraduationCap, FaBriefcase, FaRandom, FaCalendarAlt, FaGlassCheers } from "react-icons/fa";
import axios from "axios";
import Spinner from "./Spinner";

const FileUploadPage = () => {
	const correctPassword = "iammausamlodhi";
	const allowedImageTypes = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
	const allowedVideoTypes = [".mp4", ".avi", ".mov", ".wmv"];

	// Utility functions first
	const validateFile = (file) => {
		const extension = `.${file.name.split(".").pop().toLowerCase()}`;
		const isImage = allowedImageTypes.includes(extension);
		const isVideo = allowedVideoTypes.includes(extension);

		if (!isImage && !isVideo) {
			return `${file.name} has an unsupported file type`;
		}
		return null;
	};

	const simulateUpload = (file) => {
		setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				const currentProgress = prev[file.name] || 0;
				if (currentProgress >= 100) {
					clearInterval(interval);
					return prev;
				}
				return { ...prev, [file.name]: currentProgress + 10 };
			});
		}, 500);
	};

	// State declarations
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [files, setFiles] = useState([]);
	const [uploadProgress, setUploadProgress] = useState({});
	const [errors, setErrors] = useState([]);
	const [category, setCategory] = useState("");
	const [tags, setTags] = useState([]);
	const [currentTag, setCurrentTag] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	// Hooks that depend on utility functions
	const onDrop = useCallback((acceptedFiles) => {
		const newErrors = [];
		const validFiles = acceptedFiles.filter((file) => {
			const error = validateFile(file);
			if (error) {
				newErrors.push(error);
				return false;
			}
			return true;
		});

		setErrors(newErrors);
		setFiles((prevFiles) => [...prevFiles, ...validFiles]);

		validFiles.forEach((file) => {
			simulateUpload(file);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
	});

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (password === correctPassword) {
			setIsAuthenticated(true);
			setPasswordError("");
		} else {
			setPasswordError("Incorrect password");
		}
	};

	// If not authenticated, show password screen
	if (!isAuthenticated) {
		return (
			<div className=' bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center'>
				<div className='max-w-md w-full mx-4 bg-white rounded-lg shadow-md p-6'>
					<div className='flex justify-center mb-6'>
						<FiLock className='w-12 h-12 text-blue-500' />
					</div>
					<h2 className='text-2xl font-semibold text-center mb-6'>Enter Password</h2>
					<form onSubmit={handlePasswordSubmit}>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='Enter password to upload images'
						/>
						{passwordError && <p className='text-red-500 text-sm mt-2'>{passwordError}</p>}
						<button type='submit' className='w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300'>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}

	// Original component code starts here
	const removeFile = (fileName) => {
		setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
		setUploadProgress((prev) => {
			const newProgress = { ...prev };
			delete newProgress[fileName];
			return newProgress;
		});
	};

	const getFileIcon = (fileName) => {
		const extension = fileName.split(".").pop().toLowerCase();
		if (allowedImageTypes.includes(`.${extension}`)) return <FiImage className='w-6 h-6' />;
		if (allowedVideoTypes.includes(`.${extension}`)) return <FiVideo className='w-6 h-6' />;
		return <FiFile className='w-6 h-6' />;
	};

	const handleAddTag = (e) => {
		e.preventDefault();
		if (currentTag.trim() && !tags.includes(currentTag.trim())) {
			setTags([...tags, currentTag.trim()]);
			setCurrentTag("");
		}
	};

	const removeTag = (tagToRemove) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	const predefinedCategories = [
		{ id: "random", label: "Random", icon: <FaRandom /> },
		{ id: "freshers", label: "Freshers", icon: <FaGraduationCap /> },
		{ id: "internship", label: "Internship", icon: <FaBriefcase /> },
		{ id: "celebration", label: "Celebration", icon: <FaGlassCheers /> },
		{ id: "picnic", label: "Picnic", icon: <FiImage /> },
		{ id: "visit", label: "Visit", icon: <FiImage /> },
	];

	const predefinedTags = [
		{ id: "random", label: "Random", icon: <FaRandom /> },
		{ id: "freshers", label: "Freshers", icon: <FaGraduationCap /> },
		{ id: "internship", label: "Internship", icon: <FaBriefcase /> },
		{ id: "celebration", label: "Celebration", icon: <FaGlassCheers /> },
		{ id: "picnic", label: "Picnic", icon: <FiImage /> },
		{ id: "visit", label: "Visit", icon: <FiImage /> },
	];

	const handleCategorySelect = (categoryId) => {
		setCategory(categoryId);
	};

	const handleUpload = async () => {
		if (!category) {
			setErrors(["Category is required"]);
			return;
		}

		if (tags.length === 0) {
			setErrors(["At least one tag is required"]);
			return;
		}
		if (files.length === 0) {
			setErrors(["Please upload at least one file"]);
			return;
		}

		setIsUploading(true); // Start loading

		const formData = new FormData();
		files.forEach((file) => {
			formData.append("images", file);
		});
		formData.append("data", JSON.stringify({ category, tags }));

		try {
			const token = localStorage.getItem("token"); // Get the auth token
			const response = await axios.post("http://localhost:5000/images/upload/multiple", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("Upload successful:", response.data);
			setErrors(["Upload successful"]);
			setFiles([]); // Clear files after successful upload
			setTags([]); // Clear tags
			setCategory(""); // Clear category
		} catch (error) {
			console.error("Upload failed:", error);
			if (error.response?.status === 403) {
				setErrors(["You don't have permission to upload files. Super admin access required."]);
			} else {
				setErrors(["Upload failed. Please try again."]);
			}
		} finally {
			setIsUploading(false); // Stop loading regardless of success or failure
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 lg:p-6'>
			<div className='max-w-4xl mx-auto'>
				<div className='mb-4 space-y-4'>
					<div>
						<label className='block text-xs font-medium text-gray-700 mb-2'>Category</label>
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
							{predefinedCategories.map((cat) => (
								<button
									key={cat.id}
									onClick={() => handleCategorySelect(cat.id)}
									className={`flex items-center justify-center space-x-2 p-2 rounded-lg transition-all duration-300
                    ${category === cat.id ? "bg-blue-500 text-white shadow-lg transform scale-105" : "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300"}`}>
									<span className='text-lg'>{cat.icon}</span>
									<span className='text-xs font-medium'>{cat.label}</span>
								</button>
							))}
						</div>
					</div>

					<div>
						<label className='block text-xs font-medium text-gray-700 mb-2'>Tags</label>
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-3'>
							{predefinedTags.map((tag) => (
								<button
									key={tag.id}
									onClick={() => !tags.includes(tag.id) && setTags([...tags, tag.id])}
									className={`flex items-center justify-center space-x-2 p-2 rounded-lg transition-all duration-300
                    ${tags.includes(tag.id) ? "bg-blue-500 text-white shadow-lg transform scale-105" : "bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300"}`}>
									<span className='text-lg'>{tag.icon}</span>
									<span className='text-xs font-medium'>{tag.label}</span>
								</button>
							))}
						</div>

						<div className='mt-2 flex flex-wrap gap-2'>
							{tags.map((tag, index) => (
								<span
									key={index}
									className='inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition-all duration-300'>
									{tag}
									<button onClick={() => removeTag(tag)} className='ml-1.5 hover:text-blue-900 transition-colors'>
										<FiX className='w-3 h-3' />
									</button>
								</span>
							))}
						</div>
					</div>
				</div>

				<div
					{...getRootProps()}
					className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 hover:shadow-lg
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}>
					<input {...getInputProps()} />
					<FiUpload className='mx-auto h-12 w-12 text-blue-500' />
					<p className='mt-2 text-sm text-gray-600'>Drag and drop files here, or click to select files</p>
					<p className='mt-1 text-xs text-gray-500'>Supported formats: Images (JPG, JPEG, PNG, GIF, WEBP) up to 5MB, Videos (MP4, AVI, MOV, WMV) up to 50MB</p>
				</div>

				{errors.length > 0 && (
					<div className='mt-4 p-4 bg-red-50 rounded-lg'>
						{errors.map((error, index) => (
							<p key={index} className='text-sm text-red-600'>
								{error}
							</p>
						))}
					</div>
				)}

				{files.length > 0 && (
					<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{files.map((file) => (
							<div key={file.name} className='relative p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'>
								<button
									onClick={() => removeFile(file.name)}
									className='absolute top-2 right-2 p-1.5 rounded-full hover:bg-red-100 transition-colors group'>
									<FiX className='w-4 h-4 text-gray-500 group-hover:text-red-500' />
								</button>
								<div className='flex items-center space-x-3'>
									{getFileIcon(file.name)}
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-gray-900 truncate'>{file.name}</p>
										<p className='text-xs text-gray-500'>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
									</div>
								</div>
								<div className='mt-3'>
									<div className='bg-gray-200 rounded-full h-2.5'>
										<div
											className='bg-blue-500 h-2.5 rounded-full transition-all duration-500'
											style={{ width: `${uploadProgress[file.name] || 0}%` }}
										/>
									</div>
									<p className='mt-1 text-xs text-gray-500 text-right'>{uploadProgress[file.name] || 0}%</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<button
				onClick={handleUpload}
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center'
				disabled={isUploading}>
				{isUploading ? (
					<>
						<Spinner />
						<span className='ml-2'>Uploading...</span>
					</>
				) : (
					"Upload"
				)}
			</button>
		</div>
	);
};

export default FileUploadPage;
