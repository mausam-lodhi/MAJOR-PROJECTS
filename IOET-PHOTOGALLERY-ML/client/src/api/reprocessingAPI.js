import axios from "axios";
import API from "../utils/api";

// 🔄 Trigger manual reprocessing for a student
export const triggerReprocessing = (studentId) => API.post(`/api/reprocess/student/${studentId}`);

// 📊 Get reprocessing status for a student
export const getReprocessingStatus = (studentId) => API.get(`/api/reprocess/status/${studentId}`);
