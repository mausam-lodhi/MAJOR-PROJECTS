import React from "react";
import "./index.css";
import FirstPage from "./pages/firstPage";
import MainPage from "./pages/login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import WelcomePage from "./pages/welcome";
import EntriesPage from "./pages/entries";
import AddEntries from "./pages/addEntries";
import EditEntries from "./pages/updateEntries";
import ProfilePage from "./pages/profilePage";
import About from "./pages/about";
import ContactUs from "./pages/contactUs";
import VerificationPage from "./pages/verificationPage";
import SignUp from "./pages/signup";
import { useAuth } from "./context/AuthContext";

function App() {
	const { user } = useAuth();

	return (
		<Router>
			<Routes>
				<Route path='/' element={<FirstPage />} />
				<Route path='/login' element={<MainPage />} />
				<Route path='/contact' element={<ContactUs />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/verify' element={<VerificationPage />} />
				<Route path='*' element={<Navigate to='/' />} />

				<Route
					path='/welcome'
					element={
						<PrivateRoute>
							<WelcomePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/entries'
					element={
						<PrivateRoute>
							<EntriesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/add-entries'
					element={
						<PrivateRoute>
							<AddEntries />
						</PrivateRoute>
					}
				/>
				<Route
					path='/entries/:id'
					element={
						<PrivateRoute>
							<EditEntries />
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<PrivateRoute>
							<ProfilePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/about'
					element={
						<PrivateRoute>
							<About />
						</PrivateRoute>
					}
				/>
				<Route
					path='/verify'
					element={
						<PrivateRoute>
							<VerificationPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
