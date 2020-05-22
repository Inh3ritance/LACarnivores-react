import React from 'react';
import './ProductCard.scss';

/* Takes in information retrieved by Database/Array to render a Product Card */
const ProductCard = ({ id, quantity, visible, selector, view, updateCart, passToExpansion, plant_info }) => {
    if (plant_info[3] === selector && quantity !== 0) {
            return (
                <div className="product-card">

                    <button className="remove-button" onClick={() => passToExpansion({ id, quantity, visible, selector, view: true, plant_info})}>
                        <div className="product-header" style={{ backgroundImage: 'url(.' + plant_info[10][0] + ')' }}>
                            <h4 className="product-name">{plant_info[0]}</h4>
                        </div>
                    </button>

                    <div className="product-card-body">
                        <p className="price">{plant_info[9]}$</p>
                        <p className="product-body-content">{plant_info[1]}</p>
                    </div>

                    <div className="product-button">
                        <button className="btn" onClick={() => updateCart({ id, quantity, visible, units: -1, plant_info })}>-</button><h3> Add to Cart </h3><button className="btn" onClick={() => updateCart({ id, quantity, visible, units: 1, plant_info })}>+</button>
                    </div>

                </div>
            )
        } return (<span></span>)
    }

export default ProductCard;