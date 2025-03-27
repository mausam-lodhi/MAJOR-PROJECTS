import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [loading, setLoading] = useState(true);

	const checkAuthState = async () => {
		try {
			const storedUser = localStorage.getItem("user");
			const storedToken = localStorage.getItem("token");

			if (storedUser && storedToken) {
				setUser(JSON.parse(storedUser));
				setToken(storedToken);
			}
		} catch (error) {
			console.error("Error checking auth state:", error);
			// Clear potentially corrupted data
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			setUser(null);
			setToken(null);
		}
	};

	useEffect(() => {
		checkAuthState().finally(() => {
			setLoading(false);
		});
	}, []);

	const login = (userData, userToken) => {
		setUser(userData);
		setToken(userToken);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", userToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		window.location.href = "/"; // Ensure redirection to login page
	};

	return <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
