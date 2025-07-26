import axios from "axios";
import API from "../utils/api";

// 🔍 Search for photos by student name
export const searchPhotosByStudent = (studentName) => API.get(`/api/search/${encodeURIComponent(studentName)}`);

// 🔍 Alternative search endpoint (if using different route structure)
export const searchStudentInPhotos = (studentName) => API.get(`/api/students/search/${encodeURIComponent(studentName)}`);
