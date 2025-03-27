import axios from "axios";

// Base URL from environment variables
const API = axios.create({
	baseURL: "http://localhost:5000/",
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response Interceptor
API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			const { status } = error.response;

			// Unauthorized (401) - Token issues
			if (status === 401) {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				window.location.href = "/login";
				alert("Your session has expired. Please log in again.");
			}

			// Forbidden (403) - Permissions issue
			if (status === 403) {
				alert("You do not have permission to access this resource.");
			}

			// Internal Server Error (500)
			if (status === 500) {
				alert("A server error occurred. Please try again later.");
			}
		}

		return Promise.reject(error);
	}
);

// Add a function to handle logout
export const logout = async () => {
	try {
		await API.post("/logout");
	} catch (error) {
		console.error("Logout error:", error);
	}
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	window.location.href = "/";
};

export default API;
