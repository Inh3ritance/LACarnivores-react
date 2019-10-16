import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';

import Nepenthes_Glabrata_300X200 from './Images/nepenthes_glabrata_300X200.jpg';
import Nepenthes_Glabrata_600X400 from './Images/nepenthes_glabrata_600X400.jpg';

const products = [
	{
		id:1,
		quantity:1,
		type:"Hardy",
		name:"Venus Flytrap",
		description:"Go fly yu yrap",
		price:14.99,
		visible:true,
		img: ('')
	},
	
	{
		id:2,
		quantity:1,
		type:"Hardy",
		name:"Red Dragon Flytrap",
		description:"Im red",
		price:14.99,
		visible:true,
		img: ('')
	},

	{
		id:3,
		quantity:1,
		type:"Nepenthes",
		name:"Ventrata",
		description:"unique",
		price:24.99,
        visible: true,
        img: [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        //img: 'url(${Nepenthes_Glabrata})'
	},
	
	{
		id:4,
		quantity:1,
		type:"Hardy",
		name:"Pinguicula Gigantae X Laeunae",
		description:"thats big",
		price:19.99,
		visible:true,
		img: ('')
    },

    {
        id: 5,
        quantity: 1,
        type: "Tropical",
        name: "sundew",
        description: "sticky",
        price: 8.99,
        visible: true,
        img: ('')
	},
];

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /*view: false,*/
            selector: 'Default',
            /*poduct_card: ProductCard.Component*/
            cart: [
                {
                    id: 4,
                    quantity: 1,
                    type: "Hardy",
                    name: "Pinguicula Gigantae X Laeunae",
                    description: "thats big",
                    price: 19.99,
                    visible: true,
                    img: (''),
                    units: 0
                }
            ],
            expansion: [
                {
                    id: 0,
                    quantity: 0,
                    type: "",
                    name: "",
                    description: "",
                    price: 0,
                    visible: false,
                    img: [('')],
                    view: false
                }
            ]
        };
    }

    closeView(value) {
        this.setState({
            expansion: [{ view: value.view }]       
        });
    }

    passToExpansion(product) {
        this.setState({
            expansion: [{ view: product.view, img: product.img }]
            /*expansion: [...this.state.expansion, product]*/
        });
    }

    updateCart(product) {
        const existingProduct = this.state.cart.filter(p => p.id === product.id)
        if (existingProduct.length > 0) {
            const withoutExistingProduct = this.state.cart.filter(p => p.id !== product.id);
            const updateUnitsProduct = {
                ...existingProduct[0],
                units: existingProduct[0].units + product.units
            };

            this.setState({
                cart: [...withoutExistingProduct, updateUnitsProduct]
            });

        } else {
            this.setState({
                cart: [...this.state.cart, product]
            });
        }

    }

    onChangeSelector(selected) {
        this.setState({
            selector: selected
        });
    }

    /*onChangeViewer(view_value) {
        this.setState({
            view: view_value
        });
    }*/

render() {
    return (
        <div className="Body">
            <ProductExpansion view={this.state.expansion[0].view} img={this.state.expansion[0].img} closeView={this.closeView.bind(this)} />
            <div className="Carousel-Container parrallax">
                <h1>Preservation Through Cultivation</h1>
            </div>
            <div className="Container">
                <div className="Left-Nav">
                    <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
               </div>
                <div className="Content">
                    <h1>Welcome!</h1>

                    <ul>
                        {
                            this.state.cart.map(c => <li>{c.name} | units {c.units}</li>)
                        }
                    </ul>

                    <h2>{this.state.selector}</h2>

                    <div className="Product-Cards">
                        {products.map(p => <ProductCard key={p.id} {...p} selector={this.state.selector} updateCart={this.updateCart.bind(this)} passToExpansion = {this.passToExpansion.bind(this)} /*Viewer={this.onChangeViewer.bind(this)}*/ />)}
                    </div>
                <div id="bottom-space"></div>
            </div>
            </div>
        </div>
        );
    }
}

export default Body;