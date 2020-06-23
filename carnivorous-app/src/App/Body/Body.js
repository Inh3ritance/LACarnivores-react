import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { add, quantity, list, get, exists } from 'cart-localstorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Body extends React.Component {

    /**Initialize State */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            expansion: [{}],
            selector: 'Default'
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

        //Reloads session selection preventing default HomeScreen on reload
        if(sessionStorage.getItem('select')){
            this.setState({selector: sessionStorage.getItem('select')});
        }
    }

    /**Update will check if props had updated to prevent NESTED STATE issues */
    componentDidUpdate(oldProps) {
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

    /**Add product to local storage */
    addToCart(product) {
        let data = {
            id: product.id, 
            name: product.name, 
            price: (product.meta.metadata.price/100).toFixed(2), 
            quantity: product.meta.metadata.quantity,
            image: product.meta.images,
        }
        const productDetails = (data);
        if(exists(product.id) ) {
            if(get(product.id).quantity >= parseInt(productDetails.quantity)){
                toast("No more in stock"); //dont add to cart
            } else {
                add(productDetails, 1);
                console.log("Cart: ", list());
                toast(data.name + " Added to cart");
                this.props.rerenderParentCallback();
            }
        } else {
            add(productDetails, 1);
            console.log("Cart: ", list());
            toast(data.name + " Added to cart");
            this.props.rerenderParentCallback();
        }
    }
    
    /**Remove Product from local Storage */
    deleteFromCart(product) {
        quantity(product.id, -1);
        console.log("Cart: ", list());
        this.props.rerenderParentCallback();
    }

    /**Changes type navigation tab */
    onChangeSelector(selected) {
        this.setState({
            selector: selected
        });
        sessionStorage.setItem('select', selected); //Saves selection when user reloads tab
    }

    render() {
        return (
            <div className="Body">
                <ToastContainer limit = "5" pauseOnHover={false}/>
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