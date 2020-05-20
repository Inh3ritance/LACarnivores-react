import './CheckoutForm.scss';
import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
      super(props);
      this.state = { complete: false, name: ''};
      this.submit = this.submit.bind(this);

  }

  async submit(ev) {
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: this.state.name });
    let response = await fetch("/charge", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
    if (response.ok) this.setState({ complete: true });
}

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div>
                <form 
                    onSubmit={(ev: React.ChangeEvent<HTMLFormElement>) => this.submit(ev)}
                    >
                    <fieldset>
                        <legend><b>Checkout</b></legend>
                        <div className="inner">
                                <div className = "Left-Form">
                                    <p className = "p-check">First Name*: </p><input type="text" value={this.state.name} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: ev.target.value })}></input>
                                    <p className = "p-check">Last Name*: </p><input type="text"></input>
                                    <p className = "p-check">Email*: </p><input type="text"></input>
                                </div>
                                <div className = "Right-Form">
                                    <p className = "p-check">State*: </p>
                                    <select>
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
                                    <p className = "p-check">City*: </p><input type="text"></input>
                                    <p className = "p-check">Adress*: </p><input type="text"></input>
                                    <p className="NoMargin" style={{ display: "inline" }}>Card: </p>
                                </div>
                                <CardElement className="checkout" />
                                <button 
                                    className = "Checkout_Button" 
                                >Purchase</button>
                        </div>
                    </fieldset>
                </form>
            </div>
    );
  }
}

export default injectStripe(CheckoutForm);