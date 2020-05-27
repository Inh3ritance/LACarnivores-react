import './CheckoutForm.scss';
import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CheckoutForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.submit = this.submit.bind(this);
    }

    initialState() {
        return {
            complete: false,
            fullName: '',
            Address: '',
            Email: '',
            State: '',
            City: '',
        }
    }

    async submit(ev) {
        ev.preventDefault();

        let name = this.state.fullName;
        let email = this.state.Email;
        let data = {
            name: name,
            email: email,
        }
        this.props.stripe.createToken({
            name: name,
            email: email,
        });
        return await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) this.setState({ complete: true });
            console.log("Success");
            toast("Purchase Succesfull!",
                { type: 'success' })
        }).catch(e => {
            console.log("Failure");
            toast("Oopsie, something went wrong!",
                { type: 'error' })
            throw (e);
        })
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete!</h1>;
        return (
            <div>
                <form method="post" onSubmit={(ev: React.ChangeEvent<HTMLFormElement>) => this.submit(ev)}>
                    <fieldset>
                        <legend><b>Shipping & Billing</b></legend>
                        <div className="inner">
                            <label htmlFor="name">Full Name</label><input className="glow" required placeholder="John Smith" autoComplete="name" name = "name" type="text" value={this.state.fullName} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: ev.target.value })}></input>
                            <label htmlFor="email">Email</label><input required placeholder="email@example.com" autoComplete="email" name="email" type="text" value={this.state.Email} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Email: ev.target.value })}></input>
                            <label>State</label>
                            <select required="required">
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
                            <label htmlFor="city">City </label><input required placeholder="New Pork City" autoComplete="on" name="city" type="text" value={this.state.City} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ City: ev.target.value })}></input>
                            <label htmlFor="street-address">Adress </label><input required placeholder="123 StreetName Ave." autoComplete="on" name="street-address" type="text" value={this.state.Address} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ Address: ev.target.value })}></input>
                            <label className="NoMargin">Card: </label>
                            <CardElement className="checkout" required />
                            <button className="Checkout_Button"><b>Submit Payment</b></button>
                            <ToastContainer className="toasty" limit="1" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);