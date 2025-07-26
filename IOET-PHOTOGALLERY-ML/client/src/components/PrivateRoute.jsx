import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-white'>
				<Spinner size='large' color='primary' variant='border' />
			</div>
		);
	}

	return user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
