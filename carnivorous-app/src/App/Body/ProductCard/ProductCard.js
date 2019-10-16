import React from 'react';
import './ProductCard.scss';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';
import Body from '../Body.js';

const ProductCard = ({ id, quantity, type, name, description, img, price, visible, selector, view, updateCart, passToExpansion }) => {

/*class ProductCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            quantity: 0,
            type: '',
            name: '',
            description: '',
            img: '',
            price: 0,
            visibile: false,
            selector: '',
            view: ''
        };
    }
    PassClass() {
        return this;
    }
    render() { // remove render to revert back to funcion component */

        if (type == selector) {
            return (
                <div className="product-card">
                    <button className="remove-button" onClick={() => passToExpansion({ id, quantity, type, name, description, img, price, visible, selector, view: true })}>
                        <div className="product-header" style={{ backgroundImage: 'url(.' + img[0] + ')' }}>
                            <h4 className="product-name">{name}</h4>
                        </div>
                    </button>

                    <div className="product-card-body">
                        <p className="price">{price}$</p>
                        <p className="product-body-content">{description}</p>
                    </div>

                    <div className="product-button">
                        <button className="btn" onClick={() => updateCart({ id, quantity, type, name, description, img, price, visible, units: -1 })}>-</button><h3> Add to Cart </h3><button className="btn" onClick={() => updateCart({ id, quantity, type, name, description, img, price, visible, units: 1 })}>+</button>
                    </div>

                </div>
            )
        } return (<span></span>)
    }

export default ProductCard;