import React from 'react';
import './ProductCard.scss';

/* Takes in information retrieved by Database/Array to render a Product Card */
const ProductCard = ({ id, name, visible, selector, view, description, updateCart, passToExpansion, metadata , images}) => {
    let quantity = Number(metadata.quantity);
    let type = metadata.type;

    if (metadata.type === selector && quantity !== 0) {
            return (
                <div className="product-card">

                    <button className="remove-button" onClick={() => passToExpansion({ id, quantity, visible, selector, view: true, type})}>
                        <div className="product-header" style={{ backgroundImage:  'url(' + images[0] + ')' }}>
                            <h4 className="product-name">{name}</h4>
                        </div>
                    </button>

                    <div className="product-card-body">
                        <p className="price">$10.99</p>
                        <p className="product-body-content">{description}</p>
                    </div>

                    <div className="product-button">
                        <button className="btn" onClick={() => updateCart({ id, quantity, visible, units: -1, type})}>-</button><h3> Add to Cart </h3><button className="btn" onClick={() => updateCart({ id, quantity, visible, units: 1, type })}>+</button>
                    </div>

                </div>
            )
        } else if(metadata.type === selector && quantity === 0) {
            return (
            <div className="product-card">

            <button className="remove-button">
                <div className="product-header sold" style={{ backgroundImage: 'url(' + images[0] + ')' }}>
                    <h4 className = "product-name">{name}</h4>
                </div>
                <h4 className = "soldout"> <b>Sold Out </b></h4>
            </button>

            <div className="product-card-body">
                <p className="price">$10.99</p>
                <p className="product-body-content">{description}</p>
            </div>

            <div className="product-button">
                <button className="btn reject">-</button><h3> Add to Cart </h3><button className="btn reject">+</button>
            </div>

          </div>
          )
        } else {
            return(<span></span>);
        }
    }

export default ProductCard;