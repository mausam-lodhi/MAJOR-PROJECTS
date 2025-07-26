import express from "express";
import { upload } from "../utils/cloudinary.js";
import { uploadStudentPhoto } from "../controllers/studentController.js";
import { searchPhotosByStudent } from "../controllers/searchController.js";

const router = express.Router();

// POST /api/students/upload
router.post("/upload", upload.single("photo"), uploadStudentPhoto);

// GET /api/students/search/:name
router.get("/search/:name", searchPhotosByStudent);

export default router;
