// server/controllers/searchController.js
import { getStudentAppearances } from "../services/reprocessingService.js";

const searchPhotosByStudent = async (req, res) => {
	try {
		const studentName = req.params.name;
		console.log(`🔍 Enhanced search request for student: "${studentName}"`);

		// Use the enhanced service method for flexible searching
		const photos = await getStudentAppearances(studentName);

		console.log(`📊 Enhanced search completed: ${photos.length} photos found for "${studentName}"`);

		// Add search metadata to response for debugging
		const response = {
			searchTerm: studentName,
			resultsCount: photos.length,
			photos: photos,
			searchType: "enhanced_flexible_matching",
		};

		res.status(200).json(response);
	} catch (error) {
		console.error("Error in enhanced search:", error);
		res.status(500).json({
			message: "Server error while searching photos",
			searchTerm: req.params.name,
		});
	}
};

export { searchPhotosByStudent };
