import React from 'react';
import './Footer.scss';

/* Static DOM Footer */
function Footer() {
  return (
    <div className="Footer">
		<div className="Col">
			<h2>LACarnivores@gmail.com</h2>
			<h2>Phone:(323)-123-4567</h2>
		</div>
		<div className="Col">
			<h2>Privacy Policy</h2>
			<h2>Facebook/Twitter...</h2>
		</div>
		<div className="Col">
			<h2>Terms Conditions</h2>
			<h2>Visa Pay .....</h2>
		</div>
    </div>
  );
}

export default Footer;
