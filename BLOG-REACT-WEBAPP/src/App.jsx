import { useState, useEffect } from "react";
import AuthorsFilter from "./components/AuthorsFilter";
import CategoriesDropdown from "./components/CategoriesDropdown";
import BlogPost from "./components/BlogPost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import blogData from "./data/blog.json";
import "./App.css";

const App = () => {
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);

	const authors = [...new Set(blogData.blog.map((item) => item.author))];
	const categories = [
		...new Set(blogData.blog.map((item) => item.category)),
	];

	useEffect(() => {
		let filtered = blogData.blog;

		if (selectedAuthor) {
			filtered = filtered.filter(
				(post) => post.author === selectedAuthor
			);
		}

		if (selectedCategory) {
			filtered = filtered.filter(
				(post) => post.category === selectedCategory
			);
		}

		setFilteredPosts(filtered);
		setIsFiltered(selectedAuthor || selectedCategory);
	}, [selectedAuthor, selectedCategory]);

	const renderPosts = () => {
		if (isFiltered && filteredPosts.length > 0) {
			return filteredPosts.map((post) => (
				<BlogPost key={post.id} post={post} />
			));
		}
		return (
			<div className='no-posts'>
				<p>
					No posts available. Please select a
					category or author.
				</p>
			</div>
		);
	};

	return (
		<div className='app-container'>
			<Header />
			<div className='filters-section'>
				<CategoriesDropdown
					categories={categories}
					setSelectedCategory={
						setSelectedCategory
					}
				/>
			</div>
			<div className='main-content'>
				<AuthorsFilter
					authors={authors}
					setSelectedAuthor={setSelectedAuthor}
				/>
				<div className='blog-posts'>
					{renderPosts()}
				</div>
			</div>
			<div style={{ marginTop: "21vh", width: "100vw" }}>
				<Footer />
			</div>
		</div>
	);
};

export default App;
