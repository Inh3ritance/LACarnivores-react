import React from 'react';
import './Footer.scss';
import Logo from '../Nav/Logo.png';
import { NavLink } from "react-router-dom";

/* Static DOM Footer */
const Footer = () => {
  return (
    <div className="Footer">
		<div className="Col">
			<NavLink exact to='/Contact' activeClassName="active"><h2>Contact Us</h2></NavLink>
			<NavLink exact to='/Privacy Policy' activeClassName="active"><h2>Privacy Policy</h2></NavLink>
			<NavLink exact to='/Terms Conditions' activeClassName="active"><h2>Terms Conditions</h2></NavLink>
			<NavLink exact to='/Shipping+Returns' activeClassName="active"><h2>Shipping and Returns</h2></NavLink>
			<p>
				<a class="fa fa-facebook social-media" onClick={()=> window.location = "https://facebook.com"} />
				<a class="fa fa-twitter social-media" onClick={()=> window.location = "https://twitter.com"} />
				<a class="fa fa-instagram social-media" onClick={()=> window.location = "https://instagram.com"} />
			</p>
		</div>
		<h3>c LaCarnivores 2021</h3>
    </div>
  );
}

export default Footer;
