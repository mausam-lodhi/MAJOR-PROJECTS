// server/services/reprocessingService.js
import axios from "axios";
import Student from "../models/Student.js";
import EventPhoto from "../models/Image.js";

/**
 * Reprocess all existing event photos when a new student is added
 * @param {string} studentId - MongoDB ID of the new student
 * @param {string} encodingId - Face encoding ID from ML server
 */
const reprocessEventPhotosForStudent = async (studentId, encodingId) => {
	try {
		console.log(`🔄 Starting reprocessing for student ${studentId} with encoding ${encodingId}`);

		// Get all existing event photos
		const eventPhotos = await EventPhoto.find({});

		if (eventPhotos.length === 0) {
			console.log("📝 No existing event photos to reprocess");
			return;
		}

		console.log(`📊 Found ${eventPhotos.length} event photos to reprocess`);

		// Prepare data for ML server
		const eventPhotosData = eventPhotos.map((photo) => ({
			photo_id: photo._id.toString(),
			image_url: photo.ImageUrl,
		}));

		// Send to ML server for reprocessing
		const response = await axios.post(`${process.env.ML_API_URL}/reprocess-events`, {
			student_encoding_id: encodingId,
			event_photos: eventPhotosData,
		});

		const { matched_events, student_name } = response.data;

		if (matched_events && matched_events.length > 0) {
			console.log(`🎯 Found ${matched_events.length} matches for ${student_name}`);

			// Update the student's matchedPhotos array
			const matchedPhotoIds = matched_events.map((event) => event.photo_id);
			await Student.findByIdAndUpdate(studentId, {
				$addToSet: { matchedPhotos: { $each: matchedPhotoIds } },
			});

			// Update each matched event photo to include the student's name
			for (const matchedEvent of matched_events) {
				await EventPhoto.findByIdAndUpdate(matchedEvent.photo_id, {
					$addToSet: { detectedFaces: student_name },
				});
				console.log(`✅ Added ${student_name} to event photo ${matchedEvent.photo_id}`);
			}

			console.log(`🎉 Reprocessing complete! Updated ${matched_events.length} event photos for ${student_name}`);
		} else {
			console.log(`📝 No matches found for ${student_name} in existing event photos`);
		}
	} catch (error) {
		console.error("❌ Error during reprocessing:", error.message);
		// Don't throw error to prevent student upload from failing
		// Just log the error for debugging
	}
};

/**
 * Normalize a name by removing symbols, extra spaces, and converting to lowercase
 * @param {string} name - Name to normalize
 * @returns {string} Normalized name
 */
const normalizeName = (name) => {
	return name
		.toLowerCase()
		.replace(/[_\-\s]+/g, "") // Remove underscores, hyphens, and spaces
		.trim();
};

/**
 * Call ML server for face recognition with fallback endpoints
 * @param {string} imageUrl - URL of the image to process
 * @returns {Array} Array of detected names
 */
const callMLServerForRecognition = async (imageUrl) => {
	const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";

	// Try different possible endpoints and request formats - prioritizing /match since it exists
	const endpointConfigs = [
		{ endpoint: "/match", payload: { image_url: imageUrl } },
		{ endpoint: "/recognize", payload: { image_url: imageUrl } },
		{ endpoint: "/detect-faces", payload: { image_url: imageUrl } },
		{ endpoint: "/process", payload: { image_url: imageUrl } },
		{ endpoint: "/match", payload: { ImageUrl: imageUrl } }, // Alternative field name
		{ endpoint: "/recognize", payload: { ImageUrl: imageUrl } },
	];

	let lastError = null;

	for (const config of endpointConfigs) {
		try {
			console.log(`🔍 Trying ML endpoint: ${ML_API_URL}${config.endpoint}`);

			const response = await axios.post(`${ML_API_URL}${config.endpoint}`, config.payload, {
				timeout: 30000,
				headers: { "Content-Type": "application/json" },
			});

			// Handle different possible response formats
			let detectedNames = [];

			if (response.data.detected_names) {
				detectedNames = response.data.detected_names;
			} else if (response.data.matched_names) {
				detectedNames = response.data.matched_names;
			} else if (response.data.faces) {
				detectedNames = response.data.faces;
			} else if (response.data.names) {
				detectedNames = response.data.names;
			} else if (Array.isArray(response.data)) {
				detectedNames = response.data;
			}

			// Ensure we return an array of strings
			if (Array.isArray(detectedNames)) {
				return detectedNames.filter((name) => typeof name === "string" && name.trim().length > 0);
			}

			return [];
		} catch (error) {
			lastError = error;
			console.log(`❌ ML endpoint ${config.endpoint} failed: ${error.message}`);
		}
	}

	// If all endpoints failed, throw the last error
	console.error(`❌ All ML server endpoints failed. Last error: ${lastError?.message}`);
	throw new Error(`ML server unavailable: ${lastError?.message}`);
};

/**
 * Process all photos in database for face recognition and update detectedFaces
 * @returns {Object} Processing results
 */
const processAllPhotosForFaceRecognition = async () => {
	try {
		console.log(`🚀 Starting face recognition processing for all photos in database`);

		// Get all photos from database
		const allPhotos = await EventPhoto.find({});

		if (allPhotos.length === 0) {
			console.log("📝 No photos found in database");
			return { processed: 0, updated: 0, errors: 0 };
		}

		console.log(`📊 Found ${allPhotos.length} photos to process`);

		// Get all students for reference
		const allStudents = await Student.find({});
		console.log(`👥 Found ${allStudents.length} students in database`);

		let processed = 0;
		let updated = 0;
		let errors = 0;
		const batchSize = 5; // Reduced batch size to be more conservative
		const delayBetweenRequests = 2000; // 2 seconds between requests

		// Process photos in batches
		for (let i = 0; i < allPhotos.length; i += batchSize) {
			const batch = allPhotos.slice(i, i + batchSize);
			console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allPhotos.length / batchSize)}`);

			// Process each photo in the current batch
			for (const photo of batch) {
				try {
					processed++;
					console.log(`🔍 Processing photo ${processed}/${allPhotos.length}: ${photo._id}`);

					// Skip if photo has no imageUrl
					if (!photo.imageUrl) {
						console.log(`⚠️ Photo ${photo._id} has no imageUrl, skipping`);
						continue;
					}

					// Call ML server for face recognition
					const detectedNames = await callMLServerForRecognition(photo.imageUrl);

					if (detectedNames.length > 0) {
						// Update photo with detected faces
						await EventPhoto.findByIdAndUpdate(photo._id, {
							detectedFaces: detectedNames,
						});

						console.log(`✅ Updated photo ${photo._id} with detected faces: ${detectedNames.join(", ")}`);
						updated++;

						// Update student matchedPhotos arrays
						for (const detectedName of detectedNames) {
							const student = allStudents.find((s) => s.name.toLowerCase().trim() === detectedName.toLowerCase().trim());

							if (student) {
								await Student.findByIdAndUpdate(student._id, {
									$addToSet: { matchedPhotos: photo._id.toString() },
								});
								console.log(`👤 Added photo ${photo._id} to student ${student.name} matches`);
							}
						}
					} else {
						console.log(`📝 No faces detected in photo ${photo._id}`);
						// Update with empty array to mark as processed
						await EventPhoto.findByIdAndUpdate(photo._id, {
							detectedFaces: [],
						});
					}

					// Add delay between requests to avoid overwhelming the ML server
					if (processed < allPhotos.length) {
						await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
					}
				} catch (photoError) {
					errors++;
					console.error(`❌ Error processing photo ${photo._id}:`, photoError.message);

					// Mark photo as processed but with error
					try {
						await EventPhoto.findByIdAndUpdate(photo._id, {
							detectedFaces: [], // Empty array indicates processed but no faces found/error
						});
					} catch (updateError) {
						console.error(`❌ Failed to update photo ${photo._id} after error:`, updateError.message);
					}
				}
			}
		}

		console.log(`🎉 Face recognition processing completed!`);
		console.log(`📊 Results: ${processed} processed, ${updated} updated, ${errors} errors`);

		return { processed, updated, errors };
	} catch (error) {
		console.error("❌ Error during face recognition processing:", error.message);
		throw error;
	}
};

/**
 * Reprocess specific photos by their IDs
 * @param {Array} photoIds - Array of photo IDs to reprocess
 * @returns {Object} Processing results
 */
const reprocessSpecificPhotos = async (photoIds) => {
	try {
		console.log(`🔄 Reprocessing ${photoIds.length} specific photos`);

		const photos = await EventPhoto.find({ _id: { $in: photoIds } });
		const allStudents = await Student.find({});

		let processed = 0;
		let updated = 0;
		let errors = 0;
		const delayBetweenRequests = 2000; // 2 seconds between requests

		for (const photo of photos) {
			try {
				processed++;
				console.log(`🔍 Reprocessing photo ${photo._id}`);

				if (!photo.imageUrl) {
					console.log(`⚠️ Photo ${photo._id} has no imageUrl, skipping`);
					continue;
				}

				const detectedNames = await callMLServerForRecognition(photo.imageUrl);

				// Update photo with detected faces
				await EventPhoto.findByIdAndUpdate(photo._id, {
					detectedFaces: detectedNames,
				});

				console.log(`✅ Updated photo ${photo._id} with detected faces: ${detectedNames.join(", ")}`);
				updated++;

				// Update student matchedPhotos arrays
				for (const detectedName of detectedNames) {
					const student = allStudents.find((s) => s.name.toLowerCase().trim() === detectedName.toLowerCase().trim());

					if (student) {
						await Student.findByIdAndUpdate(student._id, {
							$addToSet: { matchedPhotos: photo._id.toString() },
						});
					}
				}

				// Add delay between requests
				if (processed < photos.length) {
					await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
				}
			} catch (photoError) {
				errors++;
				console.error(`❌ Error reprocessing photo ${photo._id}:`, photoError.message);
			}
		}

		return { processed, updated, errors };
	} catch (error) {
		console.error("❌ Error during specific photo reprocessing:", error.message);
		throw error;
	}
};

/**
 * Get all photos where a student appears (for search functionality)
 * Enhanced with case-insensitive, partial matching, and name normalization
 * @param {string} studentName - Name of the student to search for
 * @returns {Array} Array of EventPhoto documents
 */
const getStudentAppearances = async (studentName) => {
	try {
		console.log(`🔍 Enhanced search for: "${studentName}"`);

		// Normalize the search term
		const normalizedSearch = normalizeName(studentName);
		console.log(`🔄 Normalized search term: "${normalizedSearch}"`);

		// Escape special regex characters in user input
		const escapeRegex = (string) => {
			return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		};

		const escapedSearchTerm = escapeRegex(studentName.trim());
		const escapedNormalizedTerm = escapeRegex(normalizedSearch);

		// Create multiple search patterns for flexibility
		const searchQueries = [
			// 1. Case-insensitive exact match
			{ detectedFaces: new RegExp(`^${escapedSearchTerm}$`, "i") },
			// 2. Case-insensitive partial match
			{ detectedFaces: new RegExp(escapedSearchTerm, "i") },
			// 3. Search within the array for normalized matches
			{ detectedFaces: { $regex: escapedNormalizedTerm, $options: "i" } },
		];

		// Use $or to match any of the patterns
		const query = { $or: searchQueries };

		console.log(`📊 Search with ${searchQueries.length} flexible patterns`);

		const photos = await EventPhoto.find(query);

		console.log(`✅ Found ${photos.length} photos with enhanced matching`);
		return photos;
	} catch (error) {
		console.error("Error getting student appearances:", error);
		throw error;
	}
};

export { reprocessEventPhotosForStudent, getStudentAppearances, processAllPhotosForFaceRecognition, reprocessSpecificPhotos };
