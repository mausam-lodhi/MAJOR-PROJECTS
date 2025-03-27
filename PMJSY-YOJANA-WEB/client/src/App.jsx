import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/mainPage";
import Hospitals from "./components/hospitals";
import SearchPage from "./components/searchPage";
import HospitalInformation from "./components/hospitalsDetails";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/home' />} />
				<Route path='/home' element={<MainPage />} />
				<Route path='/home/search' element={<SearchPage />} />
				<Route path='/home/search/hospitals' element={<Hospitals />} />
				<Route path='/home/search/hospitals/:selectedHospital' element={<Hospitals />} />
				<Route path='/home/search/hospitals/details/:hospitalName' element={<HospitalInformation />} />
			</Routes>
		</Router>
	);
}

export default App;
