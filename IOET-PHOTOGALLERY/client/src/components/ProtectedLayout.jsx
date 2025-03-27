import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const ProtectedLayout = () => {
	return (
		<div id='container'>
			<Header />
			<div id='content'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProtectedLayout;
