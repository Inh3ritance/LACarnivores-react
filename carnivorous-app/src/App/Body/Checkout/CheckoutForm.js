import './CheckoutForm.scss';
import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { ToastContainer, toast } from 'react-toastify';
import DisplayCart from './DisplayCart/DisplayCart.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { total, list } from 'cart-localstorage';

class CheckoutForm extends Component {

    /*Initialize State for CheckoutForm */
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.submit = this.submit.bind(this);
        this.rerenderCheckout = this.rerenderCheckout.bind(this);
    }

    /*Force Update onClick when cart updates*/
    rerenderCheckout() {
        this.forceUpdate();
        this.props.rerenderParentCallback();
    }

    /*Update state when localStorage changes*/
    componentDidMount() {
        let count = this.getNumberOfItemsinCart();
        if (count === 0) this.setState({ disable: true });
        if (this.state.total !== count) this.setState({ total: count });
        this.setState({ data: list() })
    }

    /*Update State onClick when localStorage changes */
    componentDidUpdate() {
        let count = this.getNumberOfItemsinCart();
        if (this.state.total !== count) {
            this.setState({ data: list(), total: count });
            if (count === 0) this.setState({ disable: true });
        }
    }

    /*Initialize State First Frame */
    initialState() {
        return {
            disable: false,
            complete: false,
            check: true,
            data: [],
            //
            fullName: '',
            Email: '',
            Phone: '',
            Billing_Address: '',
            Billing_State: 'AL',
            Billing_Zip: '',
            Billing_City: '',
            Shipping_Address: '',
            Shipping_State: 'AL',
            Shipping_Zip: '',
            Shipping_City: '',
        }
    }

    /*Submit Form details and proceed to Backend Code */
    async submit(ev) {
        console.log("THE CART", this.state.data);
        ev.preventDefault();

        // Get Card Token
        /* Temporary solution */
        const card = document.getElementsByTagName(CardElement);
        const result = await this.props.stripe.createToken(card);
        // Personal Information
        let name = this.state.fullName;
        let email = this.state.Email;
        // eslint-disable-next-line
        let phone = this.state.Phone;

        // Billing Information
        let city = this.state.Billing_City;
        let address = this.state.Billing_Address;
        let state = this.state.Billing_State;

        // Shipping Information
        let shippingCity = this.state.Shipping_City;
        let shippingAddy = this.state.Shipping_Address;
        let shippingState = this.state.Shipping_State;

        console.log(result);
        // Data that gets sent to the backend
        let data = {};
        if (this.state.check) {
            data = {
                name: name,
                email: email,
                city: city,
                line1: address,
                state: state,
                shippingCity: city,
                shippingAddy: address,
                shippingState: state,
                card: result,
            }
        } else {
            data = {
                name: name,
                email: email,
                city: city,
                line1: address,
                state: state,
                shippingCity: shippingCity,
                shippingAddy: shippingAddy,
                shippingState: shippingState,
                card: result,
            }
        }

        // Charge 
        return await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) this.setState({ complete: true });
            console.log("Success");

            //Clear Cart + Form
            toast("Purchase Succesfull!",
                { type: 'success' })
        }).catch(e => {
            console.log("Failure");
            toast("Oopsie, something went wrong!",
                { type: 'error' })
            throw (e);
        })
    }

    /**Returns total number of products in cart */
    getNumberOfItemsinCart() {
        const shopCart = list();
        var cartQuantity = 0;
        var i = 0;

        // Calculate number of items in cart
        for (i; i < shopCart.length; i++) {
            cartQuantity = cartQuantity + list()[i].quantity;
        }
        return cartQuantity;
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete!</h1>;
        return (
            <div>
                <div className="TopForm"><DisplayCart rerenderCheckout={this.rerenderCheckout} /></div>
                <form method="post" onSubmit={(ev: React.ChangeEvent<HTMLFormElement>) => this.submit(ev)}>
                    <fieldset disabled={this.state.disable}>
                        <legend><b>Shipping & Billing</b></legend>
                        <div className="inner">
                            <label id="chlbl">Shipping & Billing The Same? </label><input id="chlbl" type="checkbox" defaultChecked="true" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ check: !this.state.check })} />
                            <hr />
                            <h1><b>Billing</b></h1>
                            <label htmlFor="name">Full Name</label><input className="glow" required placeholder="John Smith" autoComplete="name" name="name" type="text" value={this.state.fullName}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: ev.target.value })} />
                            <label htmlFor="email">Email</label><input required placeholder="email@example.com" autoComplete="email" name="email" type="text" value={this.state.Email}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Email: ev.target.value })} />
                            <label>State</label>
                            <select required="required" value={this.state.Billing_State} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Billing_State: ev.target.value })}>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                            <label htmlFor="city">City </label><input required placeholder="New Pork City" autoComplete="on" name="city" type="text" value={this.state.Billing_City}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Billing_City: ev.target.value })} />
                            <label htmlFor="street-address">Address </label><input required placeholder="123 StreetName Ave." autoComplete="on" name="street-address" type="text" value={this.state.Billing_Address}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Billing_Address: ev.target.value })} />
                            <hr />
                            {
                                !this.state.check &&
                                <div>
                                    <h1><b>Shipping</b></h1>
                                    <label>State</label>
                                    <select required="required" value={this.state.Shipping_State} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Shipping_State: ev.target.value })}>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    <label htmlFor="city">City</label><input required placeholder="New Pork City" autoComplete="on" name="city" type="text" value={this.state.Shipping_City} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Shipping_City: ev.target.value })} />
                                    <label htmlFor="street-address">Address</label><input required placeholder="123 StreetName Ave." autoComplete="on" name="street-address" type="text" value={this.state.Shipping_Address} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Shipping_Address: ev.target.value })} />
                                    <hr />
                                </div>
                            }
                            <label className="NoMargin">Card Details: </label>
                            <CardElement className="checkout" />
                            <button className="Checkout_Button"><b>Submit Payment</b></button>
                            <ToastContainer className="toasty" limit="1" />
                        </div>
                        <div className="RightForm">
                            <DisplayCart rerenderCheckout={this.rerenderCheckout} />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);