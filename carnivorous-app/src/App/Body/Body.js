import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';

import venus from './Images/Test.jpg';

function Body() {
  return (
    <div className="Body">
		<div className="Carousel-Container parrallax">
			<h1>Something!</h1>
		</div>
		<div className="Container">
			<div className= "Left-Nav">
				<h2>Home</h2>
				<h2>Cold & Hardy</h2>
				<h2>Tropical</h2>
				<h2>Byblis</h2>
				<h2>Nepenthes</h2>
			</div>
			<div className = "Content">
				<h1>Welcome!</h1>
				<div>
					<ProductCard/>
				</div>
			</div>
		</div>
    </div>
  );
}

export default Body;
