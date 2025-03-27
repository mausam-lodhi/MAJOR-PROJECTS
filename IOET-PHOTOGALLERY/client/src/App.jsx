import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortfolioSection from "./components/PortfolioSection";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import GallerySection from "./components/GallerySection";
import SingleProject from "./components/SingleProject";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ComingSoon from "./components/ComingSoon";
import { useAuth, AuthProvider } from "./context/AuthContext";
import VerificationPage from "./components/VerificationPage";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import Spinner from "./components/Spinner";
import FileUploadPage from "./components/fileUploadPage";
import WelcomePage from "./components/welcome";
import Timer from "./components/Timer";

// Import styles in the correct order
import "font-awesome/css/font-awesome.min.css"; // Add this if you're using Font Awesome
import "./App.css";

// Create a wrapper component to conditionally render Header

function AppRoutes() {
	const { logout } = useAuth();

	return (
		<Routes>
			{/* Public routes */}
			<Route path='/' element={<WelcomePage />} />
			<Route path='/verify' element={<VerificationPage />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<SignUp />} />
			<Route path='/verify' element={<VerificationPage />} />
			<Route path='/coming-soon' element={<ComingSoon />} />
			<Route path='/loading' element={<Spinner />} />
			<Route path='/logout' element={<Navigate to='/' replace onClick={logout} />} />

			{/* Protected routes */}
			<Route
				element={
					<PrivateRoute>
						<ProtectedLayout />
					</PrivateRoute>
				}>
				<Route path='/wait' element={<Timer />} />
				<Route path='/portfolio' element={<PortfolioSection />} />
				<Route
					path='/about'
					element={
						<>
							<About />
							<Team />
						</>
					}
				/>
				<Route path='/contact' element={<Contact />} />
				<Route path='/gallery' element={<GallerySection />} />
				<Route path='/image-preview/:_id' element={<SingleProject />} />
				<Route path='/image/upload' element={<FileUploadPage />} />
				<Route path='/added-soon' element={<ComingSoon />} />
			</Route>

			{/* Catch all route */}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
