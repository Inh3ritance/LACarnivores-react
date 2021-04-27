import React from 'react';
import './Body.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { add, quantity, list, get, exists } from 'cart-localstorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Default from "./Images/Main/Default.jpg";
import Hardy from "./Images/Main/Hardy.jpg";
import Tropical from "./Images/Main/Tropical.jpg";
import Byblis from "./Images/Main/Byblis.jpg";
import Nepenthes from "./Images/Main/Nepenthes.jpg";

class Body extends React.Component {

    /**Initialize State */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            expansion: [{}],
            selector: 'Default',
        };
        this.closeView = this.closeView.bind(this);
    }

    windowSelection() {
        var select = window.location.href;
        select = select.replace('https://www.lacarnivores.com/','');
        if(select.length === 0) select = 'Default';
        if(this.state.selector !== select) {
            this.props.rerenderParentCallback();
            this.setState({selector: select});
            this.forceUpdate();
        } 
        this.updateTitle(select); // optimize this
    }

    /** Onload Products from Backend */
    async componentDidMount() {
        //Initialize Props
        this.setState({ selector: this.props.Selector });
        this.windowSelection();
        //Retrieve Product API
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/products')
        .then(response => response.json())
        .then(data => {
            this.setState({ data: Array.from(data.data) });
        }).catch(err => {
            console.log(err);
            // if product does not load, force refresh the page
            window.location.reload();
        });
    }

    /**Update will check if props had updated to prevent NESTED STATE issues */
    componentDidUpdate(oldProps) {
        const newProps = this.props;
        this.windowSelection();
        if (oldProps.Update !== newProps.Update) {
            if(oldProps.Selector !== newProps.Selector) {
                this.setState({ selector: newProps.Selector });
            }
            this.updateTitle(newProps.Selector);
            this.closeView();
        }
    }

    /**Closes model*/
    closeView() {
        this.setState({ expansion: [{ view: false }] });
        document.getElementsByTagName('body')[0].classList.remove('freeze');
    }

    /**Passes infromartion from ProductCard->ProductCardExpansion*/
    passToExpansion(product) {
        this.setState({ expansion: [{ view: product.view, meta: product.meta }] });
        document.getElementsByTagName('body')[0].classList.add('freeze'); 
    }

    /**Add product to local storage */
    addToCart(product) {
        let data = {
            id: product.id, 
            name: product.name, 
            price: (product.meta.metadata.price/100).toFixed(2), 
            quantity: product.meta.metadata.quantity,
            image: product.meta.images
        }
        const productDetails = (data);
        if(exists(product.id) ) {
            if(get(product.id).quantity >= parseInt(productDetails.quantity)) {
                toast("No more in stock"); //dont add to cart
            } else {
                add(productDetails, 1);
                toast(data.name + " Added to cart");
                this.props.rerenderParentCallback();
            }
        } else {
            add(productDetails, 1);
            toast(data.name + " Added to cart");
            this.props.rerenderParentCallback();
        }
    }
    
    /**Remove Product from local Storage */
    deleteFromCart(product) {
        quantity(product.id, -1);
        this.props.rerenderParentCallback();
    }

    /**Changes type navigation tab */
    onChangeSelector(selected) {
        this.setState({ selector: selected });
        this.updateTitle(selected);
        this.closeView();
    }

    /**Modify carousel and text */
    updateTitle(selected){
        switch(selected) {
            case 'Default':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Default + "')");
                document.getElementById("parrallax-title").innerHTML = "Preservation Through Cultivation";
                document.getElementById("Welcome").innerHTML = "Welcome";
                document.getElementById("title-text").innerHTML = "We are a new starting nursery with a wide variety of carnivorous plants and great service. Since we are new, our selections may have limited quanties,but as we grow together we will grow in product availabilty and hopefully soon a storefront. Here at LA Carnivores we raise and purchase carnivorous plants from quality vendors to make sure you get the most reliable plants in the country.";
                break;
            case 'Hardy':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Hardy + "')");
                document.getElementById("parrallax-title").innerHTML = "Cold & Hardy";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "somethingg something";
                break;
            case 'Tropical':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Tropical + "')");
                document.getElementById("parrallax-title").innerHTML = "Tropical";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "somethingg something";
                break;
            case 'Byblis':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Byblis + "')");
                document.getElementById("parrallax-title").innerHTML = "Byblis";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "somethingg something";
                break;
            case 'Nepenthes':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Nepenthes + "')");
                document.getElementById("parrallax-title").innerHTML = "Nepenthes";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "somethingg something";
                break;
            default:
                document.getElementById("parrallax").style.backgroundImage = ("url('" + null + "')");
                document.getElementById("parrallax-title").innerHTML = "Error";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "somethingg something";
                break;
        }  
    }

    render() {
        return (
            <div className="Body">
                <ToastContainer limit = "5" pauseOnHover={false} />
                <ProductExpansion view={this.state.expansion[0].view} meta={this.state.expansion[0].meta} closeView={this.closeView} />
                <div className="Carousel-Container" id="parrallax">
                    <h1 id="parrallax-title"/>
                </div>

                <div className="Container">
                    <div className="Left-Nav mobile">
                        <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
                    </div>
                    <div className="Content">
                        <h1 id="Welcome" />
                        <p id="title-text" />
                        <div className="Product-Cards">
                            {
                                this.state.data.map( p => 
                                    <ProductCard 
                                    key={p.id} {...p} 
                                    selector={this.state.selector} 
                                    addToCart={this.addToCart.bind(this)} 
                                    deleteFromCart={this.deleteFromCart.bind(this)} 
                                    passToExpansion={this.passToExpansion.bind(this)} 
                                    /> 
                                )
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