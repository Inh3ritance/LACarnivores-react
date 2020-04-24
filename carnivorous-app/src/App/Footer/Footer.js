import React from 'react';
import './Footer.scss';

/* Static DOM Footer */
function Footer() {
  return (
    <div className="Footer">
		<div className="Col">
			<h3>LACarnivores@gmail.com</h3>
			<h3>Phone:(323)-123-4567</h3>
		</div>
		<div className="Col">
			<h3>Privacy Policy</h3>
			<h3>Facebook/Twitter...</h3>
		</div>
		<div className="Col">
			<h3>Terms Conditions</h3>
			<h3>Visa Pay .....</h3>
		</div>
    </div>
  );
}

export default Footer;
