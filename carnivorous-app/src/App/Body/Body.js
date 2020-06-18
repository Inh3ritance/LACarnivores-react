import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { add, total, quantity, list } from 'cart-localstorage';

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            cart: [],
            NumberOfItemsInCart: [],
            subtotal: [],
            expansion: [{}],
            selector: 'Default',
        };
    }

    /**Onload Products from Backend , Write code that protects when FAIL*/
    componentDidMount() {
        //Retrieve Product API
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                let dataArray = Array.from(data.data);
                this.setState({ data: dataArray });
            });

        //Initialize Props
        this.setState({ selector: this.props.Selector });

        //Initialize Cart from local storage
        /*var result = [];
        var data = JSON.parse(localStorage.getItem('cart'))
        for (var i in data)
            result.push([i, data[i]]);
        this.setState({ cart: result });*/
    }

    /**Update will check if props had updated to prevent NESTED STATES isssues */
    componentDidUpdate(oldProps) {
        console.log(oldProps);
        const newProps = this.props
        if (oldProps.Selector !== newProps.Selector) {
            this.setState({ selector: newProps.Selector });
        }
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
            expansion: [{ view: product.view, meta: product.meta, }]
        });
    }

    /**Updates Cart value, checks to make sure is greater than 0*/
    /*
    updateCart(product) {
        const existingProduct = this.state.cart.filter(p => p.id === product.id)
        if (existingProduct.length > 0) {
            const withoutExistingProduct = this.state.cart.filter(p => p.id !== product.id);
            const updateUnitsProduct = {
                ...existingProduct[0],
                units: existingProduct[0].units + product.units
            };
            if (updateUnitsProduct.units + product.units >= -1)
                this.setState({
                    cart: [...withoutExistingProduct, updateUnitsProduct]
                });
                localStorage.setItem('cart', JSON.stringify(updateUnitsProduct));
        } else {
            this.setState({
                cart: [...this.state.cart, product]
            });
            localStorage.setItem('cart', JSON.stringify(product));
        }
    }*/

    addToCart(product) {
        const productDetails = ({ id: product.id, name: product.name, price: (product.price/100).toFixed(2) });
        add(productDetails, 1);
        console.log("Cart: ", list());
        //this.setState({ subtotal: total().toFixed(2)});
        //this.setState({ NumberOfItemsInCart: this.getNumberOfItemsinCart()});
    }

    deleteFromCart(product) {
        quantity(product.id, -1);
        console.log("Cart: ", list());
        //this.setState({ subtotal: total().toFixed(2)});
        //this.setState({ NumberOfItemsInCart: this.getNumberOfItemsinCart()});
    }

    getNumberOfItemsinCart() {
        const shopCart = list();
        var cartQuantity = 0;
        var i = 0;

        // Calculate Number oF items in cart
        for (i; i < shopCart.length; i++) {
            cartQuantity = cartQuantity + list()[i].quantity;
        }
        return cartQuantity;
    }
    /**Changes type navigation tab */
    onChangeSelector(selected) {
        this.setState({
            selector: selected
        });
    }

    render() {
        this.getNumberOfItemsinCart();
        console.log("Cart: ", list());
        console.log("Total: $", total().toFixed(2));
        return (
            <div className="Body">
                <ProductExpansion view={this.state.expansion[0].view} meta={this.state.expansion[0].meta} closeView={this.closeView.bind(this)} />
                <div className="Carousel-Container parrallax">
                    <h1>Preservation Through Cultivation</h1>
                </div>
                {this.renderContent}
                <div className="Container">
                    <div className="Left-Nav mobile">
                        <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
                    </div>
                    <div className="Content">
                        <h1>{this.state.selector === "Default" ? "Welcome" : ""}</h1>
                        <p>{this.state.selector === "Default" ? "We are a new starting nursery with a wide variety of carnivorous plants and great service. Since we are new, our selections may have limited quanties,but as we grow together we will grow in product availabilty and hopefully soon a storefront. Here at LA Carnivores we raise and purchase carnivorous plants from quality vendors to make sure you get the most reliable plants in the country." : ""}</p>
                        
                        <ul>
                            {
                                //When we want to display the cart to Customer
                                //this.state.cart.map(c => c.units > 0 ? <li>{c.name} | units {c.units}</li> : "")
                            }
                        </ul>
                        <h2>{this.state.selector === "Default" ? "" : this.state.selector}</h2>

                        <div className="Product-Cards">
                            {
                                this.state.data.map(p => <ProductCard key={p.id} {...p} selector={this.state.selector} addToCart={this.addToCart.bind(this)} deleteFromCart={this.deleteFromCart.bind(this)} passToExpansion={this.passToExpansion.bind(this)} />)
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