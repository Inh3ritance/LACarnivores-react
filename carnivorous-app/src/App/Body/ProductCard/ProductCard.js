import React from 'react';
import './ProductCard.scss';

/* Takes in information retrieved by Database/Array to render a Product Card */
const ProductCard = ({ id, name, visible, selector, view, description, updateCart, passToExpansion, metadata, images}) => {
    let type = metadata.type;
    let quantity = metadata.quantity;
    if (type === selector && Number(quantity) !== 0) {
            return (
                <div className="product-card">
                    <button className="remove-button" onClick={() => passToExpansion({ id, visible, selector, view: true, images, metadata, name})}>
                        <div className="product-header" style={{ backgroundImage:  'url(' + images[0] + ')' }}>
                            <h4 className="product-name">{name}</h4>
                        </div>
                    </button>

                    <div className="product-card-body">
                        <p className="price">$10.99</p>
                        <p className="product-body-content">{description}</p>
                    </div>

                    <div className="product-button">
                        <button className="btn" onClick={() => updateCart({ id, visible, units: -1})}>-</button><h3> Add to Cart </h3><button className="btn" onClick={() => updateCart({ id, visible, units: 1 })}>+</button>
                    </div>

                </div>
            )
        } else if(type === selector && Number(quantity) === 0) {
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