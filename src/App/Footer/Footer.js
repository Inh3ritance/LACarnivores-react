import React from 'react';
import './Footer.scss';
import { Link } from "react-router-dom";

/* Static DOM Footer */
function Footer() {
  return (
    <div className="Footer">
		<div className="Col">
			<Link to='/Contact' activeclassname="contact_render"><h2>Contact Us</h2></Link>
			<Link to='/Privacy Policy' activeclassname="privacy_policy_render"><h2>Privacy Policy</h2></Link>
			<Link to='/Terms Conditions' activeclassname="terms_conditions_render"><h2>Terms Conditions</h2></Link>
			<h2>Facebook/Twitter...</h2>
			<h2>Visa Pay .....</h2>
		</div>
    </div>
  );
}

export default Footer;
