import React from 'react';
import Body from '../Body/Body.js';
import Footer from '../Footer/Footer.js';
import CheckoutForm from '../Body/Checkout/CheckoutForm.js';
import Form from '../Forms/Form.jsx';
import MasterPage from '../MasterPage/MasterPage.jsx';
import Policy from '../Privacy Policy/PrivacyPolicy.js';
import ToggleSwitch from '../Body/ToggleSwitch/ToggleSwitch.js';
import { loadReCaptcha } from 'react-recaptcha-google';
import './Nav.scss';
import Logo from './Logo.png';
import { slide as Menu } from 'react-burger-menu';
import { list } from 'cart-localstorage';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { logoutUser, loginUser } from '../Login/Identity.jsx';
import netlifyIdentity from "netlify-identity-widget";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Nav extends React.Component {

  /**Constructor */
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, selector:'Default', user: null, scroll: null, update: null };
    this.handleScroll = this.handleScroll.bind(this);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  /**Force update when Body incriments products count from ProductCard */
  rerenderParentCallback() {
    this.forceUpdate();
  }

  /**Selects the Navigation/ similair to Body onSelector */
  onSelector(selector) {
    this.props.Selector(selector.target.value);
  }

  /**Changes type navigation tab */
  onChangeSelector(selected) {
    this.setState({ selector: selected });
    sessionStorage.setItem('select', selected); //Saves selection when user reloads tab
    this.closeMenu();
    this.setState({ update: true });
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
    loadReCaptcha();
    const user = localStorage.getItem("User");
    if (user)
      this.setState({user: JSON.parse(user)});
    else
      loginUser();
    netlifyIdentity.on("login", (user) => this.setState({user}, loginUser()));
    netlifyIdentity.on("logout", (user) => this.setState({user: null}, logoutUser()));
  }

  /* Update scroll position after mounting */
  componentDidUpdate() {
    this.state.scroll > this.state.top ?
      document.body.style.paddingTop = `${this.state.height}px` :
      document.body.style.paddingTop = 0;

      if(this.state.total !== this.getNumberOfItemsinCart())
        this.setState({ total: this.getNumberOfItemsinCart()});
      if(this.state.update) 
        this.setState({ update: false });
  }

  /* Closes window when Link is clicked */
  closeMenu () {
    this.setState({menuOpen: false});
  }

  /* Handles change whenever it is open or closed */
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen});  
  }

  /**Returns total number of products in cart */
  getNumberOfItemsinCart() {
    const shopCart = list();
    var cartQuantity = 0;

    // Calculate number of items in cart
    for (var i = 0; i < shopCart.length; i++)
        cartQuantity = cartQuantity + list()[i].quantity;
    return cartQuantity;
  }

  /**User signup/signin/logout */
  signIn() {
    netlifyIdentity.open();
    this.setState({menuOpen: false});
  }

  render() {
    return (
      <div>
        <Router>
          <nav className="fixed-nav">
            <Link to='/'><img id= "logo" src={Logo} alt="Logo"/></Link>
            <Link to='/'><h1 id="Company_Name">LA Carnivores</h1></Link>
            <div className="Right_Buttons mobile">
              <button id="user" onClick={()=>this.signIn()}><i className='fas fa-user'></i></button>
              <NavLink to='/Checkout' activeclassname="checkout_render">
                <button className="btn btn-info btn-lg" id="cart-overlay">
                  <h2 id="cart"><span className="glyphicon glyphicon-shopping-cart"> Cart {this.state.total}</span></h2>
                </button>
              </NavLink>
            </div>
            <div className="Right_Buttons_mobile notMobile" activeclassname="checkout_render">
              <Menu right isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} className='Menu'>
                <Link id="home" className="menu-item" to="/"><ToggleSwitch Selector={this.onChangeSelector.bind(this)} /></Link>
                <button onClick={()=>this.signIn()}><h2 id="user_mobile">Users</h2></button>
                <NavLink id="cart" className="menu-item" activeClassName="checkout_render" to="/Checkout">
                <button className="btn btn-info btn-lg" id="cart-overlay" onClick={this.closeMenu}>
                  <h2 id="cart"><span className="glyphicon glyphicon-shopping-cart"> Cart {this.state.total}</span></h2>
                </button>
                </NavLink>
              </Menu>
            </div>
          </nav>
          <Switch>
            <Route exact path='/'><div><Body Selector={this.state.selector} rerenderParentCallback={this.rerenderParentCallback} Update={this.state.update}/></div></Route>
            <Route path='/Checkout'>
                <StripeProvider apiKey="pk_test_Mg00XTISPu5dW10aHJI9IfVq00pOUm5l4g">
                  <Elements>
                    <CheckoutForm rerenderParentCallback={this.rerenderParentCallback}/>
                  </Elements>
                </StripeProvider>
            </Route>
            <Route path='/Contact'>
              <Form/>
            </Route>
            <Route path='/Privacy Policy'>
              <Policy/>
            </Route>
            <Route path='/Terms Conditions'>
            </Route>
            <Route path='/MasterPage'>
              <MasterPage/>
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }

}

export default Nav;