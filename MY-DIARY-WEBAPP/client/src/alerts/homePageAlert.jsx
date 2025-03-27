import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";

const HomePageAlert = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<>
			{isVisible && (
				<div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm'>
					<div className='bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-md shadow-md transition-all duration-300 ease-in-out flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<IoAlertCircleOutline className='text-indigo-500 w-5 h-5' />
							<span className='text-indigo-700 text-sm font-medium'>You are already on the home page</span>
						</div>
						<button
							onClick={handleClose}
							className='text-indigo-600 hover:bg-indigo-100 rounded-md p-1 inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1'
							aria-label='Close alert'>
							<IoMdClose className='w-4 h-4' />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default HomePageAlert;
