import React from 'react';
import './Body.scss';
import './SearchBar/SearchBar.scss';
import ProductCard from './ProductCard/ProductCard.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import ProductExpansion from './ProductExpansion/ProductExpansion.js';
import { add, quantity, get, exists } from 'cart-localstorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Default from "./Images/Main/Default.jpg";
import Hardy from "./Images/Main/Hardy.jpg";
import Tropical from "./Images/Main/Tropical.jpg";
import Starter from "./Images/Main/Starter.jpg";
import Bogs from "./Images/Main/Bogs.jpg";
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
        if(exists(product.id)) {
            quantity(product.id, -1);
            toast("Removed 1 from cart");
            this.props.rerenderParentCallback();
        }
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
                document.getElementById("title-text").innerHTML = "We are a new starting nursery with a wide variety of carnivorous plants and great service. Since we are new, our selections may have limited quanties, but as we grow together we will grow in product availabilty and hopefully soon a storefront. Here at LA Carnivores we raise and purchase carnivorous plants from quality vendors to make sure you get the most reliable plants in the country.";
                break;
            case 'Hardy':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Hardy + "')");
                document.getElementById("parrallax-title").innerHTML = "Cold & Hardy";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "Cold and Hardy Plants vary from wonderful venus flytraps to elegant sarrecinia, these plants thrive well in plenty of sunlight and can survive harsher temperatures.";
                break;
            case 'Tropical':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Tropical + "')");
                document.getElementById("parrallax-title").innerHTML = "Tropical";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "These plants can found in tropical terrains where adequate amounts of shade can be found. Pitcher plants are popular among tropical varieties due to its several hundred unique varieties and breeding designs and patterns.";
                break;
            case 'Starter':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Starter + "')");
                document.getElementById("parrallax-title").innerHTML = "Starter";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "The plants we reccomend to new buyers or expierenced carnivorous plant care takers to maintain an easy hassle free setup.";
                break;
            case 'Nepenthes':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Nepenthes + "')");
                document.getElementById("parrallax-title").innerHTML = "Nepenthes";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "Nepenthes are beuitifully varied plants that take on many shapes, sizes and forms from large terryfing vampire fangs to cute chubby little pitchers. For more experienced care takers, but surely worth the reward of watching your plant develop new wonderful pitchers.";
                break;
            case 'Bogs':
                document.getElementById("parrallax").style.backgroundImage = ("url('" + Bogs + "')");
                document.getElementById("parrallax-title").innerHTML = "Bogs";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "Bundled sets and varieties mixing your favorite plants together in a fashionable display of artwork to add to your collection or as a center piece for display at home.";
                break;
            default:
                document.getElementById("parrallax").style.backgroundImage = ("url('" + null + "')");
                document.getElementById("parrallax-title").innerHTML = "Error";
                document.getElementById("Welcome").innerHTML = "";
                document.getElementById("title-text").innerHTML = "You are seeing this because an error occured, please contact the lacarnivores.com about the issue so we can handle your problems appropriatly.";
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
                        <ProductCard 
                            key={p.id} {...p}  
                            addToCart={this.addToCart.bind(this)} 
                            deleteFromCart={this.deleteFromCart.bind(this)} 
                            passToExpansion={this.passToExpansion.bind(this)} 
                            isFiltered={true}  
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
                <hr id="feature-seperator"/>
                <h2>Featured Products:</h2>
                {
                    arr.map(p =>
                        <ProductCard 
                            key={p.id} {...p}  
                            addToCart={this.addToCart.bind(this)} 
                            deleteFromCart={this.deleteFromCart.bind(this)} 
                            passToExpansion={this.passToExpansion.bind(this)}
                            isFiltered={true}
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
                                            isFeatured={false} 
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