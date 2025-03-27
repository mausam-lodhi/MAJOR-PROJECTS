import { FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaRegCopyright, FaGithub } from "react-icons/fa";
function Footer() {
	return (
		<>
			<footer className='bg-gradient-to-r from-purple-800 to-pink-800 text-white py-4 px-4'>
				<div className='max-w- mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='flex flex-col space-y-3 text-left'>
						<h3 className='text-lg font-bold'>About myDiary</h3>
						<p className='text-gray-300 text-sm leading-relaxed'>Your personal space to capture moments, thoughts, and memories in a beautiful digital diary.</p>
						<div className='flex items-center space-x-2 text-gray-300 text-sm'>
							<FaRegCopyright />
							<span>2024 myDiary. All rights reserved.</span>
						</div>
					</div>

					<div className='flex flex-col space-y-3 '>
						<h3 className='text-lg font-bold'>Contact Us</h3>
						<div className='space-y-2 text-gray-300 text-sm'>
							<div className='flex items-center space-x-3 hover:text-pink-400 transition-colors duration-300'>
								<FaPhone className='text-pink-400' />
								<span>+91 882714-9667</span>
							</div>
							<div className='flex items-center space-x-3 hover:text-pink-400 transition-colors duration-300'>
								<FaEnvelope className='text-pink-400' />
								<span>harprasadlodhi1984@gmail.com</span>
							</div>
							<div className='flex items-center space-x-3 hover:text-pink-400 transition-colors duration-300'>
								<FaMapMarkerAlt className='text-pink-400' />
								<span>470001 , Tili Chauraha Sagar (M.P.)</span>
							</div>
						</div>
					</div>

					<div className='flex flex-col space-y-3'>
						<h3 className='text-lg font-bold'>Follow Us</h3>
						<div className='flex space-x-4'>
							<a href='#' className='hover:text-pink-400 transition-colors duration-300 transform hover:scale-110'>
								<FaFacebook size={24} />
							</a>
							<a href='#' className='hover:text-pink-400 transition-colors duration-300 transform hover:scale-110'>
								<FaTwitter size={24} />
							</a>
							<a href='#' className='hover:text-pink-400 transition-colors duration-300 transform hover:scale-110'>
								<FaInstagram size={24} />
							</a>
							<a
								href='https://www.linkedin.com/in/mausam-lodhi-57a020324'
								className='hover:text-pink-400 transition-colors duration-300 transform hover:scale-110'>
								<FaLinkedin size={24} />
							</a>
							<a href='https://github.com/mausam-lodhi' className='hover:text-pink-400 transition-colors duration-300 transform hover:scale-110'>
								<FaGithub size={24} />
							</a>
						</div>
						<button className='w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors duration-300 transform hover:scale-105 text-sm font-semibold '>
							Subscribe to Newsletter
						</button>
					</div>
				</div>
			</footer>
		</>
	);
}
export default Footer;
