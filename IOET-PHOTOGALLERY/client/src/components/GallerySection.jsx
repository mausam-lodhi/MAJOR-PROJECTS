import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import Isotope from "isotope-layout";
import "magnific-popup";
import ImagesLoaded from "imagesloaded"; // Change this import to capital I
import API from "../utils/api";
import Spinner from "./Spinner"; // Add this import

// Add imagesLoaded to jQuery
imagesLoaded.makeJQueryPlugin($);

const GallerySection = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [activeFilter, setActiveFilter] = useState("*");
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const isotope = useRef(null); // Use ref instead of state

	// Initial images fetch
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await API.get(`/images?page=1&limit=10`);
				setImages(Array.isArray(response.data.images) ? response.data.images : []);
				setHasMore(response.data.hasMore);
			} catch (error) {
				console.error("Error fetching images:", error);
				setImages([]);
			}
		};
		fetchImages();
	}, []);

	// Update loadMore function
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

	// Update the initialization useEffect
	useEffect(() => {
		if (!images.length) {
			setIsLoading(false);
			return;
		}

		const container = document.querySelector(".iso-call");
		if (!container) return;

		setIsLoading(true);
		setImagesLoaded(false);

		const initIsotope = () => {
			if (isotope.current) {
				isotope.current.destroy();
			}
			isotope.current = new Isotope(container, {
				itemSelector: ".gallery-post",
				layoutMode: "masonry",
				percentPosition: true,
				masonry: {
					columnWidth: ".gallery-post",
				},
			});
		};

		// Fixed imagesLoaded implementation
		const imgLoad = ImagesLoaded(container);

		imgLoad.on("done", () => {
			initIsotope();
			setIsLoading(false);
			setImagesLoaded(true);
		});

		return () => {
			if (isotope.current) {
				isotope.current.destroy();
				isotope.current = null;
			}
		};
	}, [images]);

	// Update the filter click handler
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

	// Handle filter toggle
	const handleFilterToggle = (e) => {
		e.preventDefault();
		setIsFilterVisible((prev) => !prev);
	};

	return (
		<section className='gallery-section'>
			{(!imagesLoaded || isLoading) && (
				<div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'>
					<Spinner size='large' color='primary' />
				</div>
			)}
			{/* <a className='filter-toggle' href='' onClick={handleFilterToggle}>
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
			</ul> */}
			<div className='gallery-box iso-call'>
				{Array.isArray(images) &&
					images.map((image, index) => (
						<div key={`${image._id}-${index}`} className={`gallery-post ${image.category}`} style={{ padding: "1rem" }}>
							<img
								src={image.imageUrl}
								alt={image.tags || ""}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = "/images/placeholder.jpg";
								}}
							/>
							<a className='zoom' href={image.imageUrl}>
								<i className='fa fa-search'></i>
							</a>
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

export default GallerySection;
