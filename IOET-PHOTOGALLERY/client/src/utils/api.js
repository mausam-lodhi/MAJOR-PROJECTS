import axios from "axios";

// Update baseURL to point to the server
const API = axios.create({
	baseURL: "https://gallery-ioet-dhsgsuu.onrender.com", // Make sure this matches your server port
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // Add this line for cookie handling
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
			// Handle specific status codes
			switch (error.response.status) {
				case 400:
					console.error("Bad Request:", error.response.data);
					break;
				case 401:
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					window.location.href = "/login";
					alert("Your session has expired. Please log in again.");
					break;
				case 403:
					alert("You do not have permission to access this resource.");
					break;
				case 500:
					console.error("Server Error:", error.response.data);
					alert("A server error occurred. Please try again later.");
					break;
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
