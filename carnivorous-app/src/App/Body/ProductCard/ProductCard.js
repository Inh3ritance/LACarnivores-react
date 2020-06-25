import React from 'react';
import './ProductCard.scss';

/* Takes in information retrieved by Database/Array to render a Product Card */
const ProductCard = ({ id, name, addToCart, deleteFromCart, passToExpansion, selector, attributes, description, metadata, images }) => {
    const meta = {
        name,
        metadata,
        images,
        attributes,
        description
    }
    console.log(meta.metadata.price);
    if (meta.metadata.type === selector && Number(meta.metadata.quantity) !== 0) {
        return (
            <div className="product-card">
                <button className="remove-button" onClick={() => passToExpansion({/* id, */ view: true, meta })}>
                    <div className="product-header" style={{ backgroundImage: 'url(' + images[0] + ')' }}>
                        <h4 className="product-name">{name}</h4>
                    </div>
                </button>

                <div className="product-card-body">
                    <p className="price">{"$" + (meta.metadata.price/100).toFixed(2)}</p>
                    <p className="product-body-content">{description}</p>
                </div>

                <div className="product-button">
                    <button className="btn" onClick={() => deleteFromCart({id})}>-</button><h3> Add to Cart </h3><button className="btn" onClick={() => addToCart({name, id, meta})}>+</button>
                </div>
            </div>
        )
    } else if (meta.metadata.type === selector && Number(meta.metadata.quantity) === 0) {
        return (
            <div className="product-card">

                <button className="remove-button">
                    <div className="product-header sold" style={{ backgroundImage: 'url(' + images[0] + ')' }}>
                        <h4 className="product-name">{name}</h4>
                    </div>
                    <h4 className="soldout"> <b>Sold Out </b></h4>
                </button>

                <div className="product-card-body">
                    <p className="price">{"$" + (meta.metadata.price/100).toFixed(2)}</p>
                    <p className="product-body-content">{description}</p>
                </div>

                <div className="product-button">
                    <button className="btn reject">-</button><h3> Add to Cart </h3><button className="btn reject">+</button>
                </div>

            </div>
        )
    } else {
        return (<span></span>);
    }
}

export default ProductCard;