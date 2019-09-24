import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';


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
		visible:true,
		img: ('')
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
];

class Body extends React.Component {

    constructor() {
        super();
        this.state = {
            selector: 'Default'
        };
    }

    onChangeSelector(selected) {
        this.setState({
            selector: selected
        });
    }

render() {
    return (
        <div className="Body">
            <div className="Carousel-Container parrallax">
                <h1>Preservation Through Culivation</h1>
            </div>
            <div className="Container">
                <div className="Left-Nav">
                    <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
               </div>
                <div className="Content">
                    <h1>Welcome!</h1>
                <h2>{this.state.selector}</h2>
                    <div className="Product-Cards">
                        {products.map(p => <ProductCard key={p.id} {...p} selector={this.state.selector} />)}
                </div>
                <div id="bottom-space"></div>
            </div>
            </div>
        </div>
        );
    }
}

export default Body;
