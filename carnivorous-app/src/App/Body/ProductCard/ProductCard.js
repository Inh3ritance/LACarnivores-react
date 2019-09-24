import React from 'react';
import './ProductCard.scss';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

const ProductCard = ({id,quantity,type,name,description,img,price,visible,selector}) =>  {

    if (type == selector) {
    return (
      <div className="product-card">
        
		<div className="product-header">
			<h4 className="product-name">{name}</h4>		
		</div>
		
		<div className="product-card-body">
			<p className="price">{price}$</p>
			<p className="product-body-content">{description}</p>
		</div>
	  
		<div className = "product-button">
			<button>-</button><h3> Add to Cart </h3><button>+</button>
		</div>
		
      </div>
    )
  } return (<span></span>)
}

export default ProductCard;