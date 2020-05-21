import React from 'react';
import './Footer.scss';

/* Static DOM Footer */
function Footer() {
  return (
    <div className="Footer">
		<div className="Col">
			<h5>LACarnivores@gmail.com</h5>
			<h5>Phone:(323)-123-4567</h5>
		</div>
		<div className="Col">
			<h5>Privacy Policy</h5>
			<h5>Facebook/Twitter...</h5>
		</div>
		<div className="Col">
			<h5>Terms Conditions</h5>
			<h5>Visa Pay .....</h5>
		</div>
    </div>
  );
}

export default Footer;
