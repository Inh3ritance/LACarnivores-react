import React from 'react';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import CheckoutForm from '../Body/Checkout/CheckoutForm.js';
import ToggleSwitch from '../Body/ToggleSwitch/ToggleSwitch.js';
import './Nav.scss';
import { slide as Menu } from 'react-burger-menu';
import { list } from 'cart-localstorage';
import { Elements, StripeProvider } from 'react-stripe-elements';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Nav extends React.Component {

  /* Constructor */
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, selector:'Default'};
    this.handleScroll = this.handleScroll.bind(this);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  /**Force update when Body incriments products count from ProductCard */
  rerenderParentCallback() {
    this.forceUpdate();
  }

  /**Selects the Navigation/ similair to Body onSelector */
  onSelector(selector) {
    this.props.Selector(selector.target.value);
  }

  /**Changes type navigation tab, FIX THIS!*/
  onChangeSelector(selected) {
    this.setState({
        selector: selected
    });
  }

  /* Function handling/setting scroll state*/
  handleScroll() {
    this.setState({ scroll: window.scrollY });
  }

  /* Immediatly set the state for scroll */
  componentDidMount() {
    const move = document.querySelector('nav');
    this.setState({ top: move.offsetTop, height: move.offsetHeight});
    window.addEventListener('scroll', this.handleScroll);
  }

  /* Update scroll position after mounting */
  componentDidUpdate() {
    this.state.scroll > this.state.top ?
      document.body.style.paddingTop = `${this.state.height}px` :
      document.body.style.paddingTop = 0;

      if(this.state.total !== this.getNumberOfItemsinCart()) {
        this.setState({ total: this.getNumberOfItemsinCart()});
      } 
  }

  /* Closes window when Link is clicked */
  closeMenu () {
    this.setState({menuOpen: false})
  }

  /* Handles change whenever it is open or closed */
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  /**Returns total number of products in cart */
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

  render() {
    return (
      <div>
        <Router>
          <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
            <Link to='/'><img id= "logo" src={require('./Logo.png')} alt="Logo"/></Link>
            <Link to='/'><h1 id="Company_Name">LA Carnivores</h1></Link>
            <div className="Right_Buttons mobile">
              <NavLink to='/Checkout' activeclassname="checkout_render">
                <button className="btn btn-info btn-lg" id="cart-overlay">
                  <h2 id="cart"><span className="glyphicon glyphicon-shopping-cart"> Cart {this.state.total}</span></h2>
                </button>
              </NavLink>
            </div>
            <div className="Right_Buttons_mobile notMobile" activeclassname="checkout_render">
              <Menu right className="checkout_render_mobile" isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
                <Link id="home" className="menu-item" to="/" onClick={() => this.closeMenu()}><ToggleSwitch Selector={this.onChangeSelector.bind(this)} /></Link>
                <NavLink id="cart" className="menu-item" activeClassName="checkout_render" to="/Checkout" onClick={() => this.closeMenu()}>
                <button className="btn btn-info btn-lg" id="cart-overlay">
                  <h2 id="cart"><span className="glyphicon glyphicon-shopping-cart"> Cart  {this.state.total}</span></h2>
                </button>
                </NavLink>
              </Menu>
            </div>
          </nav>
          <Switch>
            <Route exact path='/'><div><Body Selector={this.state.selector} rerenderParentCallback={this.rerenderParentCallback} /><Footer /></div></Route>
            <Route path='/Checkout'>
              <div>
                <StripeProvider apiKey="pk_test_Mg00XTISPu5dW10aHJI9IfVq00pOUm5l4g">
                  <Elements>
                    <CheckoutForm />
                  </Elements>
                </StripeProvider>
                <Footer />
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default Nav;