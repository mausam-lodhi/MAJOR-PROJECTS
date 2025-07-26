import React from "react";
import { FiLogIn } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";

const WelcomePage = () => {
	return (
		<div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center p-4'>
			<div className='max-w-md w-full text-center'>
				<h1 className='text-4xl md:text-5xl font-bold mb-6 transition-all'>Welcome to IoET Gallery</h1>
				<p className='text-lg md:text-xl text-gray-600 mb-8 px-4'>
					Explore photos of every events that occurred at our institute . it usually takes a 5 to 10 seconds to login and signup be patient
				</p>

				<div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4'>
					<a
						href='/login'
						className='bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-64 sm:w-auto flex items-center justify-center transition-all duration-300'>
						<FiLogIn className='mr-2' />
						Login
					</a>
					<a
						href='/signup'
						className='bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg w-64 sm:w-auto flex items-center justify-center transition-all duration-300'>
						<HiUserAdd className='mr-2' />
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
