import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Add useState to imports
import API from "../utils/api";
import PageLoader from "./Spinner"; // Add this import

const SingleProject = () => {
	var description = "";
	const { _id } = useParams();
	const [image, setImage] = React.useState([]);
	const [liked, setLiked] = useState(false); // Add this state
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [showAddComment, setShowAddComment] = useState(false);
	const [loading, setLoading] = useState(true); // Change initial state to true

	useEffect(() => {
		const fetchImages = async () => {
			setLoading(true);
			try {
				// Remove the colon before _id in the API endpoint
				const response = await API.get(`/images/${_id}`);
				setImage(response.data);

				// Check if user has liked this image
				const user = JSON.parse(localStorage.getItem("user"));
				if (user && user.id) {
					// Check if the user's roll number is in the likedBy array
					const hasLiked = response.data.likedBy.includes(user.rollNo);
					setLiked(hasLiked);
				}
			} catch (error) {
				console.error("Error fetching images:", error);
				setImage([]);
			} finally {
				setLoading(false);
			}
		};

		const fetchComments = async () => {
			try {
				const response = await API.get(`/image/${_id}/comments`);
				setComments(response.data);
			} catch (error) {
				console.error("Error fetching comments:", error); // Add this line
			}
		};

		fetchImages();
		fetchComments();
	}, [_id]); // Add _id to dependency array
	const Internship =
		"Internships are an essential part of university life, providing students with hands-on experience in their chosen fields. They offer opportunities to apply theoretical knowledge in real-world scenarios, helping students develop essential skills and industry insights. Whether paid or unpaid, internships pave the way for future career prospects by allowing students to network with professionals and gain valuable exposure. They serve as stepping stones to successful careers, bridging the gap between academics and the professional world.";

	const freshers =
		"Freshers are the newest members of the university community, stepping into an exciting journey of learning and self-discovery. Eager to explore new opportunities, they bring energy, enthusiasm, and fresh perspectives to campus life. Orientation programs, welcome events, and fresher parties help them adapt to the university environment and connect with peers. Freshers symbolize the future, and their journey shapes the legacy of the institution.";

	const random =
		"University life is filled with diverse moments that don’t always fit into a specific category. From spontaneous gatherings to creative projects, these random memories capture the essence of campus life. They reflect the spontaneity, friendships, and experiences that make the university journey special. Whether it’s a late-night brainstorming session, a group study moment, or an unplanned adventure, these memories add excitement and color to student life.";

	const celebration =
		"Universities host various celebrations throughout the year, marking important events, achievements, and cultural festivities. Whether it’s Independence Day, Republic Day, Annual Day, or Farewell functions, these celebrations bring students and faculty together in unity and joy. They provide a platform to showcase talent, honor traditions, and build a strong sense of community. Celebrations enrich campus life and create unforgettable moments that students cherish forever.";

	const fests =
		"University fests are vibrant and dynamic events that showcase creativity, talent, and innovation. Cultural fests bring music, dance, drama, and art to life, while technical fests highlight innovation, research, and skill development. Sports fests promote teamwork, discipline, and competitive spirit. These grand events provide students with a stage to shine, collaborate, and gain valuable experiences beyond academics. Fests create a lively and unforgettable atmosphere, making university life more enriching and enjoyable.";

	// Mock project data - in a real app, this would come from an API or props
	if (image.category === "Internship") {
		description = Internship;
	} else if (image.category === "freshers") {
		description = freshers;
	} else if (image.category === "celebration") {
		description = celebration;
	} else if (image.category === "fest") {
		description = fests;
	} else {
		description = random;
	}
	const projectData = {
		title: image.category + " image",
		categories: [image.category],
		likes: image.likes,
		completionYear: image.uploadedTime
			? typeof image.uploadedTime === "string"
				? new Date(image.uploadedTime).toISOString().slice(0, 10).replace(/-/g, "/")
				: image.uploadedTime instanceof Date
				? image.uploadedTime.toISOString().slice(0, 10).replace(/-/g, "/")
				: "N/A"
			: "N/A",
		description: [description],
		images: [image.imageUrl],
		imageId: image._id,
	};

	const handleLikeClick = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			if (!user || !user.id || !user.rollNo) {
				alert("Please login to like images");
				return;
			}

			const response = await API.put(`/image/${_id}/like`, {
				action: liked ? "unlike" : "like",
				userId: user.id,
				userRollNo: user.rollNo,
			});

			setImage(response.data.image);
			setLiked(!liked);

			// Update local storage with new liked images if needed
			const updatedUser = {
				...user,
				likedImages: response.data.userLikedImages,
			};
			localStorage.setItem("user", JSON.stringify(updatedUser));
		} catch (error) {
			console.error("Error updating like:", error);
		}
	};

	const handleAddComment = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			if (!user || !user.id) {
				alert("Please login to add comments");
				return;
			}

			const response = await API.post(`/image/${_id}/comment`, {
				comment: newComment,
				userId: user.id,
			});

			setComments(response.data.commentsArray);
			setNewComment("");
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	const handleNextImage = async () => {
		try {
			setLoading(true); // Show spinner
			const response = await API.get(`/images/next/${_id}`);
			if (response.data) {
				// Navigate to the next image using the router
				window.location.href = `/image-preview/${response.data._id}`;
			}
		} catch (error) {
			console.error("Error fetching next image:", error);
			setLoading(false); // Hide spinner on error
		}
	};

	const handlePreviousImage = async () => {
		try {
			setLoading(true); // Show spinner
			const response = await API.get(`/images/previous/${_id}`);
			if (response.data) {
				window.location.href = `/image-preview/${response.data._id}`;
			}
		} catch (error) {
			console.error("Error fetching previous image:", error);
			setLoading(false); // Hide spinner on error
		}
	};

	return (
		<>
			{loading ? (
				<PageLoader />
			) : (
				<>
					<section className='page-title-section'>
						<div className='container-fluid'>
							<h1>{projectData.title}</h1>
						</div>
					</section>
					<section className='single-project-section'>
						<div className='single-content'>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-md-5'>
										<div className='title-post'>
											<h1>{projectData.title}</h1>
											<ul className='project-tags'>
												{projectData.categories.map((category, index) => (
													<li key={index}>
														<Link to='#'>
															Id : {projectData.imageId}
															{index < projectData.categories.length - 1 ? "," : ""}
														</Link>
													</li>
												))}
											</ul>
											<Link to='#' className='likes'>
												{projectData.likes}
												<i
													onClick={handleLikeClick}
													className={`fa ${liked ? "fa-heart" : "fa-heart-o"}`}
													style={{ cursor: "pointer", color: liked ? "red" : "inherit" }}></i>
											</Link>
										</div>
										<div className='share-box'>
											<div className='row'>
												<div className='col-md-5'>
													<span>Share:</span>
													<p>Image Shared: {projectData.completionYear}</p>
												</div>
												<div className='col-md-7'>
													<ul className='social-icons'>
														<li>
															<Link to='#' className='pinterest'>
																<i className='fa fa-pinterest'></i>
															</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className='col-md-6 col-md-offset-1'>
										{projectData.description.map((paragraph, index) => (
											<p key={index}>{paragraph}</p>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className='container-fluid'>
							<div className='grid-images'>
								<div className='row'>
									<div className='col-md-12'>
										<img
											src={projectData.images[0]}
											alt={`Project gallery `}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = "/images/placeholder.jpg";
											}}
										/>
										<p style={{ display: "flex", gap: "10px" }}>
											<button
												style={{
													color: "gray",
													border: ".1px solid gray",
													borderRadius: "10px",
													padding: "5px 10px",
													backgroundColor: "white",
													fontSize: "12px",
													fontWeight: "bold",
													cursor: "pointer",
													transition: "background-color 0.3s, color 0.3s",
												}}
												onClick={handlePreviousImage}>
												Previous Image
											</button>
											<button
												style={{
													color: "gray",
													border: ".1px solid gray",
													borderRadius: "10px",
													padding: "5px 10px",
													backgroundColor: "white",
													fontSize: "12px",
													fontWeight: "bold",
													cursor: "pointer",
													transition: "background-color 0.3s, color 0.3s",
												}}
												onClick={handleNextImage}>
												Next Image
											</button>
										</p>
										<div style={{ display: "flex", justifyContent: "space-between" }}>
											<button className='btn btn-primary hover-btn' onClick={() => setShowAddComment(true)}>
												Add Comments
											</button>
										</div>

										{showAddComment && (
											<div className='add-comment-section mt-3'>
												<textarea
													value={newComment}
													onChange={(e) => setNewComment(e.target.value)}
													placeholder='Add your comment here...'
													className='form-control mt-2'
													style={{ minHeight: "100px" }}
												/>
												<button className='btn btn-primary mt-2 hover-btn' onClick={handleAddComment}>
													Submit
												</button>
											</div>
										)}

										{/* Always show comments section */}
										<div className='view-comments-section mt-4'>
											<h3>Comments</h3>
											{comments.length === 0 ? (
												<p>No comments yet. Be the first to comment!</p>
											) : (
												comments
													.slice()
													.reverse()
													.map((comment, index) => (
														<div key={index} className='comment p-3 mb-2 bg-light rounded hover-comment'>
															<p className='mb-1'>
																<strong className='hover-username'>{comment.userRollNo}:</strong>{" "}
																{comment.comment}
															</p>
															<p className='comment-date text-muted mb-0'>
																{new Date(comment.createdAt).toLocaleString()}
															</p>
														</div>
													))
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

// Add the following CSS styles
const styles = `
	.hover-btn:hover {
		background-color: #0056b3;
		color: white;
	}

	.hover-comment:hover {
		background-color: #f1f1f1;
	}

	.hover-username:hover {
		color: #0056b3;
		text-decoration: underline;
	}

	.comment {
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px;
		margin-bottom: 10px;
	}

	/* Additional styles */
	.btn {
		border-radius: 25px;
		padding: 10px 20px;
		font-size: 16px;
		transition: background-color 0.3s, color 0.3s;
	}

	.btn-primary {
		background-color: #007bff;
		border: none;
		color: white;
	}

	.btn-primary:hover {
		background-color: #0056b3;
	}

	.btn-secondary {
		background-color: #6c757d;
		border: none;
		color: white;
	}

	.btn-secondary:hover {
		background-color: #5a6268;
	}

	.add-comment-section textarea {
		border-radius: 10px;
		padding: 10px;
		font-size: 14px;
	}

	.view-comments-section {
		background-color: #f8f9fa;
		padding: 20px;
		border-radius: 10px;
	}

	.view-comments-section h3 {
		margin-bottom: 20px;
	}

	.comment-date {
		font-size: 12px;
		color: #6c757d;
	}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SingleProject;
