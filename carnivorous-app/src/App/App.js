/* Rendering Layout Components*/
import Nav from './Nav/Nav.js';
import Body from './Body/Body.js';
import Footer from './Footer/Footer.js';
import './App.css';

/* React Components / Stripe payment method */
import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './Body/Checkout/CheckoutForm.js';

function App() {
  return (
      <div>
          <StripeProvider apiKey='pk_test_Mg00XTISPu5dW10aHJI9IfVq00pOUm5l4g'>
              <Elements>
                  <CheckoutForm />
              </Elements>
          </StripeProvider>
	    <Nav/>
	    <Body/>
	    <Footer/>
    </div>
  );
}

export default App;
