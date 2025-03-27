/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./BlogPost.css";
import PropTypes from "prop-types";

const BlogPost = ({ post }) => {
	const [showMore, setShowMore] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [likeCount, setLikeCount] = useState(post.likeCount || 0);
	const [isLiked, setIsLiked] = useState(post.isLiked || false);

	// Check for the dark-mode class on the body
	useEffect(() => {
		const observer = new MutationObserver(() => {
			setIsDarkMode(
				document.body.classList.contains("dark-mode")
			);
		});

		observer.observe(document.body, { attributes: true });

		// Cleanup the observer on component unmount
		return () => observer.disconnect();
	}, []);

	// Handle like button click
	const handleLikeClick = () => {
		if (isLiked) {
			setLikeCount((prev) => prev - 1); // Decrease like count
		} else {
			setLikeCount((prev) => prev + 1); // Increase like count
		}
		setIsLiked((prev) => !prev); // Toggle liked state
	};

	return (
		<div
			className={`blog-post post ${
				isDarkMode ? "dark" : ""
			} ${showMore ? "expanded" : ""}`}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = "green";
				e.currentTarget.style.boxShadow =
					"0 4px 8px rgba(0, 0, 0, 0.6)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor =
					"transparent";
				e.currentTarget.style.boxShadow =
					"0 4px 8px rgba(0, 0, 0, 0.3)";
			}}
		>
			<h3>{post.title}</h3>
			<p>
				<strong>Tags:</strong> #{post.tags.join(", #")}
			</p>
			<p>
				<strong>Date:</strong> {post.date}
			</p>
			{showMore && (
				<>
					<p>
						<strong>Id:</strong> {post.id}
					</p>
					<p>
						<strong>Content:</strong>{" "}
						{post.content}
					</p>
					<p>
						<strong>Comments:</strong>
						{post.comments.length > 0
							? post.comments.map(
									(
										comment
									) => (
										<span
											key={
												comment.id
											}
										>
											&nbsp;
											{
												comment.content
											}
										</span>
									)
							  )
							: " No comments"}
					</p>
				</>
			)}
			<div className='button-container'>
				<button
					onClick={() =>
						setShowMore((prev) => !prev)
					}
					className='toggle-button'
				>
					{showMore ? "Show Less" : "Show More"}
				</button>
				<div className='like-button-container'>
					<button
						onClick={handleLikeClick}
						className={`like-button ${
							isLiked ? "liked" : ""
						}`}
					>
						❤️
					</button>
					<span className='like-count'>
						{likeCount}
					</span>
				</div>
			</div>
		</div>
	);
};

BlogPost.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string.isRequired,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired,
		date: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		comments: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				content: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default BlogPost;
