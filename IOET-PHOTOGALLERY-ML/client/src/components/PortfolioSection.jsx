import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import $ from "jquery";
import Isotope from "isotope-layout";
import "magnific-popup";
// Change the import statement
import ImagesLoaded from "imagesloaded";
import API from "../utils/api";
import "../css/styles.css";

const PortfolioSection = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [activeFilter, setActiveFilter] = useState("*");
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const isotope = useRef(null);
	const containerRef = useRef(null); // Ref for the container

	// Fetch images
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await API.get(`/images?page=1&limit=10`);
				const sortedImages = Array.isArray(response.data.images) ? response.data.images : [];
				setImages(sortedImages);
				setHasMore(response.data.hasMore);
			} catch (error) {
				console.error("Error fetching images:", error);
				setImages([]);
			}
		};
		fetchImages();
	}, []);

	const loadMore = async () => {
		// Save current scroll position
		const scrollPosition = window.scrollY;

		try {
			setIsLoading(true);
			const nextPage = page + 1;
			const category = activeFilter === "*" ? "" : activeFilter.replace(".", "");
			const endpoint = category ? `/images/category/${category}` : "/images";

			const response = await API.get(`${endpoint}?page=${nextPage}&limit=8`);

			if (Array.isArray(response.data.images)) {
				setImages((prev) => [...prev, ...response.data.images]);
				setHasMore(response.data.hasMore);
				setPage(nextPage);

				// Restore scroll position after state update
				setTimeout(() => {
					window.scrollTo({
						top: scrollPosition,
						behavior: "auto",
					});
				}, 100);
			}
		} catch (error) {
			console.error("Error loading more images:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Initialize Isotope
	useEffect(() => {
		if (!images.length) {
			setIsLoading(false);
			return;
		}

		const container = containerRef.current;
		if (!container) return;

		setIsLoading(true);
		setImagesLoaded(false);

		const initIsotope = () => {
			if (isotope.current) {
				isotope.current.destroy();
			}
			isotope.current = new Isotope(container, {
				itemSelector: ".project-post",
				layoutMode: "masonry",
				percentPosition: true,
				masonry: {
					columnWidth: ".project-post",
				},
			});
		};

		// Fixed imagesLoaded implementation
		try {
			new ImagesLoaded(container, (instance) => {
				initIsotope();
				setIsLoading(false);
				setImagesLoaded(true);
			});
		} catch (error) {
			console.error("Error loading images:", error);
			setIsLoading(false);
			setImagesLoaded(true); // Set to true to prevent infinite loading state
		}

		return () => {
			if (isotope.current) {
				isotope.current.destroy();
				isotope.current = null;
			}
		};
	}, [images]);

	const handleFilterClick = async (e, selector) => {
		e.preventDefault();
		setIsLoading(true);
		setActiveFilter(selector);
		setPage(1); // Reset page to 1 for new filter

		try {
			const category = selector === "*" ? "" : selector.replace(".", "");
			const endpoint = category ? `/images/category/${category}` : "/images";
			const response = await API.get(`${endpoint}?page=1&limit=10`);

			if (response.data.images) {
				setImages(response.data.images);
				setHasMore(response.data.hasMore);
			} else {
				setImages([]);
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching filtered images:", error);
			setImages([]);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterToggle = (e) => {
		e.preventDefault();
		setIsFilterVisible((prev) => !prev);
	};

	return (
		<section className='portfolio-section'>
			{(!imagesLoaded || isLoading) && (
				<div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'>
					<Spinner size='large' color='primary' />
				</div>
			)}
			<a className='filter-toggle' onClick={handleFilterToggle}>
				<i className='fa fa-align-justify' aria-hidden='true'></i>
			</a>
			<ul className={`filter ${isFilterVisible ? "visible" : ""}`}>
				<li>
					<a href='#' className={`filter-link ${activeFilter === "*" ? "active" : ""}`} onClick={(e) => handleFilterClick(e, "*")}>
						all
					</a>
				</li>
				<li>
					<a className={`filter-link ${activeFilter === ".visit" ? "active" : ""}`} href='#' onClick={(e) => handleFilterClick(e, ".visit")}>
						visit
					</a>
				</li>
				<li>
					<a className={`filter-link ${activeFilter === ".picnic" ? "active" : ""}`} href='#' onClick={(e) => handleFilterClick(e, ".picnic")}>
						Picnic
					</a>
				</li>

				<li>
					<a href='#' className={`filter-link ${activeFilter === ".random" ? "active" : ""}`} onClick={(e) => handleFilterClick(e, ".random")}>
						random
					</a>
				</li>
				<li>
					<a className={`filter-link ${activeFilter === ".freshers" ? "active" : ""}`} href='#' onClick={(e) => handleFilterClick(e, ".freshers")}>
						freshers
					</a>
				</li>
				<li>
					<a className={`filter-link ${activeFilter === ".Internship" ? "active" : ""}`} href='#' onClick={(e) => handleFilterClick(e, ".Internship")}>
						internship
					</a>
				</li>
				<li>
					<a className={`filter-link ${activeFilter === ".celebration" ? "active" : ""}`} href='#' onClick={(e) => handleFilterClick(e, ".celebration")}>
						Celebration
					</a>
				</li>
			</ul>
			<div ref={containerRef} className='portfolio-box iso-call'>
				{images.map((image, index) => (
					<div key={`${image._id}-${index}`} className={`project-post ${image.category}`} style={{ padding: "1rem" }}>
						<img src={image.imageUrl} alt={`Portfolio item ${image.imageNumber}`} style={{ width: "100%", height: "auto" }} />
						<a className='likes' href='#' style={{ cursor: "normal" }}>
							{image.likes || 0} <i className='fa fa-heart-o'></i>
						</a>
						<div className='hover-box'>
							<div className='inner-hover'>
								<h2>
									<Link to={`/image-preview/${image._id}`}>{image.category}</Link>
								</h2>
								<span className='hover-details'>
									<span className='hover-date'>{image.uploadedTime.split("T")[0]}</span>
									<span className='hover-separator'>, </span>
									<span className='hover-comments'>{image.comments} 💬</span>
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			{hasMore && (
				<div className='text-center mt-4 mb-4'>
					<button onClick={loadMore} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={isLoading}>
						{isLoading ? "Loading..." : "More"}
					</button>
				</div>
			)}
		</section>
	);
};

export default PortfolioSection;
