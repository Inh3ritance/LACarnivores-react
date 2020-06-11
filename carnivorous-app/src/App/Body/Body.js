import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { BrowserView} from 'react-device-detect';

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selector: 'Nepenthes',
            cart: [
                {
                    id: -1,
                    units: 0,
                    metadata: [],
                }
            ],
            expansion: [
                {
                    id: -1,
                    meta: [],
                    view: false,
                }
            ]
        };
    }

    /**Onload Products from Backend , Write conde that protexts when FAIL*/
    componentDidMount() {
        fetch('/products')
          .then(response => response.json())
          .then(data => this.setState({ data: Array.from(data.data) }));
    }

    /**Closes model*/
    closeView(value) {
        this.setState({
            expansion: [{ view: value.view }]       
        });
    }

    /**Passes infromartion from ProductCard->ProductCardExpansion*/
    passToExpansion(product) {
        this.setState({
            expansion: [{ view: product.view, meta: product.meta,}]
        });
    }

    /**Update cart... Needs to validate by pressing ADD TO CART! FIX THIS*/
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

    /**Changes type navigation tab, FIX THIS!*/
    onChangeSelector(selected) {
        this.setState({
            selector: selected
        });
    }

    render() {
        return (
        <div className="Body">
            <ProductExpansion view={this.state.expansion[0].view} meta={this.state.expansion[0].meta} closeView={this.closeView.bind(this)} />
            <div className="Carousel-Container parrallax">
                <h1>Preservation Through Cultivation</h1>
            </div>
            {this.renderContent}
            <div className="Container">
                <BrowserView viewClassName="Left-Nav">
                    <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
                </BrowserView>
                <div className="Content">
                    <h1>{this.state.selector === "Default" ? "Welcome" : ""}</h1>
                    <p>{this.state.selector === "Default" ? "We are a new starting nursery with a wide variety of carnivorous plants and great service. Since we are new, our selections may have limited quanties,but as we grow together we will grow in product availabilty and hopefully soon a storefront. Here at LA Carnivores we raise and purchase carnivorous plants from quality vendors to make sure you get the most reliable plants in the country." : ""}</p>
                    <ul>
                        {
                            //this.state.cart.map(c => <li>{c.plant_info[0]} | units {c.units}</li>)
                        }
                    </ul>

                    <h2>{this.state.selector === "Default" ? "" : this.state.selector}</h2>

                    <div className="Product-Cards">
                        {
                            this.state.data.map(p => <ProductCard key={p.id} {...p} selector={this.state.selector} updateCart={this.updateCart.bind(this)} passToExpansion={this.passToExpansion.bind(this)} />)
                        }
                    </div>
                <div id="bottom-space"></div>
                </div>
            </div>
        </div>
        );
    }
}

export default Body;