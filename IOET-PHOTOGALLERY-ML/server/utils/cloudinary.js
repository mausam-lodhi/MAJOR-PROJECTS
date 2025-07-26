// server/utils/cloudinary.js
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure environment variables are loaded
dotenv.config({ path: path.join(__dirname, "..", ".env") });

console.log("🔧 Cloudinary Config Check:");
console.log("  Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Found" : "Missing");
console.log("  API Key:", process.env.CLOUDINARY_API_KEY ? "Found" : "Missing");
console.log("  API Secret:", process.env.CLOUDINARY_API_SECRET ? "Found" : "Missing");

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: "ioet-gallery",
		allowed_formats: ["jpg", "jpeg", "png"],
	},
});

const upload = multer({ storage });

export { cloudinary, upload };
