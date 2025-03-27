import React from "react";
import Member6 from "../images/members/sejal_pic.jpg";
import Member2 from "../images/members/negi_pic.jpg";
import Member3 from "../images/members/team3.jpg";
import Member4 from "../images/members/uday_pic.jpg";
import Member5 from "../images/members/team3.jpg";
import Member1 from "../images/members/arjun_pic.jpg";
const Team = () => {
	return (
		<section className='team-section'>
			<div className='container-fluid'>
				<div className='title-section'>
					<h1>Our Team</h1>
					<p>Meet them</p>
				</div>
				<div className='team-box'>
					<div className='row'>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member1} alt='Mark' />
								</div>
								<h2>Arjun</h2>
								<span>FrontEnd Developer</span>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member2} alt='Lisa' />
								</div>
								<h2>Aayush</h2>
								<span>BackEnd Developer</span>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member3} alt='James' />
								</div>
								<h2>Mausam</h2>
								<span>Project Manager</span>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member4} alt='James' />
								</div>
								<h2>Uday</h2>
								<span>DevOps Engineer</span>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member5} alt='James' />
								</div>
								<h2>Vinay</h2>
								<span>UI/UX Designer</span>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='team-post'>
								<div className='team-gal'>
									<img src={Member6} alt='James' />
								</div>
								<h2>Sejal</h2>
								<span>Database Administrator</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Team;
