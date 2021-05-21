import './CheckoutForm.scss';
import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { ToastContainer, toast } from 'react-toastify';
import DisplayCart from './DisplayCart/DisplayCart.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { list, destroy } from 'cart-localstorage';
import { ReCaptcha } from 'react-recaptcha-google';

class CheckoutForm extends Component {

    /*Initialize State for CheckoutForm */
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.submit = this.submit.bind(this);
        this.rerenderCheckout = this.rerenderCheckout.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.charge = this.charge.bind(this);
        this.extendvl = this.extendvl.bind(this);
    }

    /**Initialize Recaptcha check */
    onLoadRecaptcha() {
        if(this.captcharef) {
            if(this.state.disable === false) {
                this.captcharef.reset();
                // this.captcharef.execute();
            }
        } else {
            window.location.reload();
        }
    }

    /**Respond with token to send to server */
    verifyCallback(recaptchaToken) {
        this.setState({verifyreCaptcha: recaptchaToken});
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
        else this.setState({ disable: false });
        this.onLoadRecaptcha();
        if (this.state.total !== count) this.setState({ total: count });
        this.setState({ data: list() });
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
            disable: true,
            complete: false,
            check: true,
            verifyreCaptcha: null,
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

    /**Reset form when payment is complete */
    reset(){
        destroy();
        this.setState(this.initialState());
        document.getElementById('form1').reset();
        this.rerenderCheckout();
    }

    /*Submit Form details and proceed to Backend Code */
    async submit(ev) {
        ev.preventDefault();

        this.setState({ disable: true });
        // Get Card Token
        /* Temporary solution */
        const card = document.getElementsByTagName(CardElement);
        const result = await this.props.stripe.createToken(card);
        if(result.error) {
            toast(result.error.message, { type: 'error' });
            this.setState({ disable: false });
            return;
        }
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
                cart: this.state.data,
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
                cart: this.state.data,
            }
        }

        let recaptcha_data = {
            name: data.name,
            email: data.email,
            response: this.state.verifyreCaptcha,
        };

        if(this.state.verifyreCaptcha === null){
            console.log("Failed!!!: " + this.captcharef);
        }

        console.log(this.state.verifyreCaptcha);

        // Verify this is not a bot
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/verify', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recaptcha_data)
          }).then(res => res.json()).then(json => {
            console.log(json);
            if(json.success){
                this.charge(data);
            } else {
                toast('The site believes you are a bot, try again human', { type: 'error' });
                this.setState({ disable: false });
            }
          }).catch(err => {
              console.log(err);
              throw(err);
          });
    }

    async charge(data){
        // Charge
        return await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/charge', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(res => res).then(response => {
            console.log(response);
            if(response.ok) {
                this.reset(); //Clear Cart + Form
                toast("Purchase Succesfull!", { type: 'success' });
            } else {
                toast("Oopsie, something went wrong!", { type: 'error' });
            }
        }).catch(err => {
                toast("Oopsie, something went wrong!", { type: 'error' });
                this.setState({ disable:false });
                throw (err);
        });
    }

    /**Returns total number of products in cart */
    getNumberOfItemsinCart() {
        const shopCart = list();
        var cartQuantity = 0;
        for (var i = 0; i < shopCart.length; i++)
            cartQuantity = cartQuantity + list()[i].quantity;
        return cartQuantity;
    }

    extendvl() {
        var vl = document.getElementById('vl');
        if(!this.state.check) {
            vl.style.height = '400px';
        } else {
            vl.style.height = '550px';
        }
    }

    render() {
        return (
            <div>
                <div className="TopForm"><DisplayCart rerenderCheckout={this.rerenderCheckout} /></div>
                <form id="form1" method="post" onSubmit={(ev: React.ChangeEvent<HTMLFormElement>) => this.submit(ev)}>
                    <fieldset disabled={this.state.disable}>
                        <legend><b>Payment Form</b></legend>
                        <div className="inner">
                            <label id="chlbl">Shipping & Billing The Same? </label><input id="chlbl" type="checkbox" defaultChecked="true" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ check: !this.state.check })} onClick={this.extendvl} />
                            <hr />
                            <h1><b>Billing</b></h1>
                            <div className='sidebyside'>
                            <label htmlFor="name">Full Name</label><input className="glow" required placeholder="John Smith" autoComplete="name" name="name" type="text" value={this.state.fullName}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: ev.target.value })} />
                            </div>
                            <div className='sidebyside'>
                            <label htmlFor="email">Email</label><input required className = "glow" placeholder="email@example.com" autoComplete="email" name="email" type="email" value={this.state.Email}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Email: ev.target.value })} />
                            </div>
                            <div className='sidebyside'>
                            <label htmlFor="city">City </label><input required className = "glow" placeholder="New Pork City" autoComplete="on" name="city" type="text" value={this.state.Billing_City}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Billing_City: ev.target.value })} />
                            </div>
                            <div className='sidebyside'>
                            <label htmlFor="street-address">Address </label><input className = "glow" required placeholder="123 StreetName Ave." autoComplete="on" name="street-address" type="text" value={this.state.Billing_Address}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Billing_Address: ev.target.value })} />
                            </div>
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
                            <hr />
                            {
                                !this.state.check &&
                                <div>
                                    <h1><b>Shipping</b></h1>
                                    <div className='sidebyside'>
                                    <label htmlFor="city">City</label><input required className = "glow" placeholder="New Pork City" autoComplete="on" name="city" type="text" value={this.state.Shipping_City} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Shipping_City: ev.target.value })} />
                                    </div>
                                    <div className='sidebyside'>
                                    <label htmlFor="street-address">Address</label><input required className = "glow" placeholder="123 StreetName Ave." autoComplete="on" name="street-address" type="text" value={this.state.Shipping_Address} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Shipping_Address: ev.target.value })} />
                                    </div>
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
                                    <hr />
                                </div>
                            }
                            <label className="NoMargin">Card Details: </label>
                            <CardElement className="checkout" />
                            <button className="Checkout_Button"><b>Submit Payment</b></button>
                            <div className="recaptcha">
                            <ReCaptcha
                                ref={(el) => {this.captcharef = el}}
                                size='normal'          
                                render='explicit'
                                sitekey='6Le2YAsaAAAAAHw3CVVxCOhjJV_pC-exNYyH4AHz'
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                            />
                            </div>
                            <ToastContainer className="toasty" limit="1" />
                        </div>
                        <div id="vl"/>
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