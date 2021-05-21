import React from 'react';
import './Footer.scss';
import { NavLink } from "react-router-dom";

/* Static DOM Footer */
function Footer() {
  return (
    <div className="Footer">
		<div className="Col">
			<NavLink exact to='/Contact' activeClassName="active"><h2>Contact Us</h2></NavLink>
			<NavLink exact to='/Privacy Policy' activeClassName="active"><h2>Privacy Policy</h2></NavLink>
			<NavLink exact to='/Terms Conditions' activeClassName="active"><h2>Terms Conditions</h2></NavLink>
			<h2>Facebook/Twitter...</h2>
			<h2>Visa Pay .....</h2>
		</div>
    </div>
  );
}

export default Footer;
