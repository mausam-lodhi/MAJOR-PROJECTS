import express from "express";
import { searchPhotosByStudent } from "../controllers/searchController.js";

const router = express.Router();

// GET /api/search/:name
router.get("/:name", searchPhotosByStudent);

export default router;
