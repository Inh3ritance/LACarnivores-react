import React from 'react';
import './Body.scss';
import './SearchBar/SearchBar.scss';
import ProductCard from './ProductCard/ProductCard.js';
import SearchProductCard from './ProductCard/SearchProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { add, quantity, get, exists } from 'cart-localstorage';
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
            query: '',
        };
        this.closeView = this.closeView.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.featuredProducts = this.featuredProducts.bind(this);
    }

    windowSelection() {
        var select = window.location.href;
        select = select.replace('https://www.lacarnivores.com/','');
        select = select.replace('#','');
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
                this.setState({ selector: newProps.Selector, query: '' });
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
        this.setState({ selector: selected, query: '' });
        this.updateTitle(selected);
        this.closeView();
    }

    /**Modify carousel and text */
    updateTitle(selected) {
        if(this.state.query.length === 0)
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

    // Optimize this, shouldnt need 2 maps
    filterProducts() {
        if(this.state.query.length === 0) return null;
        const arr = this.state.data.filter((prod) => {
            const name = prod.name.toLowerCase();
            return name.includes(this.state.query.toLowerCase());
        });
        return (
            <div>
                <h2>Search Results:</h2>
                {
                    arr.length === 0 ? <h2>no results</h2> :
                    arr.map(p =>
                        <SearchProductCard 
                            key={p.id} {...p}  
                            addToCart={this.addToCart.bind(this)} 
                            deleteFromCart={this.deleteFromCart.bind(this)} 
                            passToExpansion={this.passToExpansion.bind(this)} 
                        /> 
                    )
                }
            </div>
        );
    }

    featuredProducts() {
        if(this.state.selector !== 'Default') return null;
        const arr = this.state.data.filter((prod) => {
            return prod.metadata.featured.includes('y'); 
        });
        if(arr.length === 0) return null;
        return (
            <div>
                <h2>Featured Products:</h2>
                {
                    arr.map(p =>
                        <SearchProductCard 
                            key={p.id} {...p}  
                            addToCart={this.addToCart.bind(this)} 
                            deleteFromCart={this.deleteFromCart.bind(this)} 
                            passToExpansion={this.passToExpansion.bind(this)} 
                        /> 
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div className="Body">
                <ToastContainer limit = "5" pauseOnHover={false} />
                <ProductExpansion view={this.state.expansion[0].view} meta={this.state.expansion[0].meta} closeView={this.closeView} />
                <div className="Carousel-Container" id="parrallax">
                    <h1 id="parrallax-title">Preservation Through Cultivation</h1>
                    <div id="searchbar-container">
                        <label htmlFor="header-search">
                            <span className="visually-hidden">Search for plants</span>
                        </label>
                        <input
                            value={this.state.query}
                            onChange={e => this.setState({query: e.currentTarget.value})}
                            type="text"
                            id="header-search"
                            placeholder="Search for plants"
                            name="s"
                        />
                    </div>
                </div>
                <div className="Container">
                    <div className="Left-Nav mobile">
                        <ToggleSwitch Selector={this.onChangeSelector.bind(this)} />
                    </div>
                    <div className="Content">
                        {
                        this.state.query.length === 0 ? (
                            <div>
                                <h1 id="Welcome">Welcome</h1>
                                <p id="title-text"/>
                                <this.featuredProducts/>
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
                            </div>
                            ) : (<this.filterProducts/>)
                        }
                        <div id="bottom-space"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;