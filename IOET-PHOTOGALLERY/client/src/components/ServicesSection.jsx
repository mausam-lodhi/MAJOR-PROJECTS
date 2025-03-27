import React from "react";

const Services = () => {
	return (
		<section className='services-section'>
			<div className='container-fluid'>
				<div className='title-section'>
					<h1>Our main services</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus
						id, mattis vel, nisi.
					</p>
				</div>
				<div className='services-box'>
					<div className='row'>
						<div className='col-md-4'>
							<div className='services-post'>
								<i className='fa fa-camera' aria-hidden='true'></i>
								<h2>Professional Camera</h2>
								<p>Phasellus hendrerit pellentesque aliquet nibh nec urna in nisi neque, aliquet vel, dapibus id, mattis vel, nisi...</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='services-post'>
								<i className='fa fa-camera-retro' aria-hidden='true'></i>
								<h2>Best Photographer</h2>
								<p>Phasellus hendrerit pellentesque aliquet nibh nec urna in nisi neque, aliquet vel, dapibus id, mattis vel, nisi...</p>
							</div>
						</div>
						<div className='col-md-4'>
							<div className='services-post'>
								<i className='fa fa-picture-o' aria-hidden='true'></i>
								<h2>Deliver Images</h2>
								<p>Phasellus hendrerit pellentesque aliquet nibh nec urna in nisi neque, aliquet vel, dapibus id, mattis vel, nisi...</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
