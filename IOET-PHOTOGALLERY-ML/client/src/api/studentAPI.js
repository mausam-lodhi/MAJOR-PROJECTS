import axios from "axios";

import API from "../utils/api";

// 📤 Upload student photo
export const uploadStudentPhoto = (formData) =>
	API.post("/api/students/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

// 🔍 Search student photos by name (face-matching done server-side)
export const searchStudentPhotos = (name) => API.get(`/api/students/search/${name}`);
