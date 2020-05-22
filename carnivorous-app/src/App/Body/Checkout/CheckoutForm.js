import './CheckoutForm.scss';
import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          complete: false,
          First_name: '',
          Last_Name:'',
          Adress:'',
          Email:'',
          State:'',
          City:'',
      };
      this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    try{
    let { token } = await this.props.stripe.createToken({ name: this.state.First_name });
    let response = await fetch("/charge", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: token.id
    });
    if (response.ok) console.log("Purchase Complete!")
    if (response.ok) this.setState({ complete: true });
    } catch(e){
        throw (e);
    }
  }

    render() {
        if (this.state.complete) return <h1>Purchase Complete!</h1>;
        return (
            <div>
                <form method="post" onSubmit={(ev: React.ChangeEvent<HTMLFormElement>) => this.submit(ev)}>
                    <fieldset>
                        <legend><b>Shipping & Billing</b></legend>
                        <div className="inner">
                            <label>First Name</label><input className = "glow" required placeholder = "JOHN" autoComplete = "on" type="text" value={this.state.First_name} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ First_name: ev.target.value })}></input>
                            <label>Last Name</label><input required placeholder = "DOE" autoComplete = "on" type="text"></input>
                            <label>Email</label><input required placeholder = "email@example.com" autoComplete = "on" type="text"></input>
                            <label>State</label>
                            <select required = "required">
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
                            <label>City </label><input required placeholder = "City" autoComplete = "on" type="text"></input>
                            <label>Adress </label><input required placeholder = "123 StreetName Ave." autoComplete = "on" type="text"></input>
                            <label className="NoMargin">Card: </label>
                            <CardElement  className="checkout" />
                            <button className = "Checkout_Button">Submit Payment</button>
                        </div>
                    </fieldset>
                </form>
            </div>
    );
  }
}

export default injectStripe(CheckoutForm);