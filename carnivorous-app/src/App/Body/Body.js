import React from 'react';
import './Body.scss';

import venus from './Images/Test.jpg'

function Body() {
  return (
    <div className="Body">
		<div className="Carousel-Container parrallax">
			<img src= {venus} />
		</div>
		<div className="Container">
			<div className= "Left-Nav">
				<h1>Home</h1>
				<h1>Colas & Hardy</h1>
				<h1>Tropical</h1>
				<h1>Byblis</h1>
				<h1>Nepenthes</h1>
			</div>
			<div className = "Content">
				<h1>Right</h1>
			</div>
		</div>
    </div>
  );
}

export default Body;
