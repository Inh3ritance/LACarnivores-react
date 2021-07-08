import React from 'react';
import './Forms.scss';
import { ToastContainer, toast } from 'react-toastify';

class Form extends React.Component {

    /**Constructor */
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        subject: '',
        text: '',
        web_issue: false,
        ship_issue: false,
        returns: false,
        other: false
      };
      this.sendEmail = this.sendEmail.bind(this);
    }

    /**Send Email */
    async sendEmail(e) {
        e.preventDefault();
        var str = this.state.subject;
        if(this.state.web_issue) str += " *Web-Issue";
        if(this.state.ship_issue) str += " *Shipping-Issue";
        if(this.state.returns) str += " *Returns";
        if(this.state.other) str += " *Other";
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/sendEmail', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                subject: str,
                email: this.state.email,
                text: this.state.text
            }) 
        }).then(response => response.json()).then(response => {
            console.log(response);
            if(response) {
                toast("Email Sent!", { type: 'success' });
                this.setState({ 
                    email: '', 
                    subject: '', 
                    text: '', 
                    web_issue: false, 
                    ship_issue: false, 
                    returns: false, 
                    other: false
                });
            } else {
                toast('Error submitting email', { type: 'error' });
            }
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return(
            <div className='Contact'>
                <h1 id="contact-header"><b>Contact</b></h1>
                <div id="contact-info">
                    <h3>(323) 999-9999</h3>
                    <h3>1234 ab.ave, CA 90000</h3>
                </div>
                <h2><b>Please select:</b> So we may understand you better</h2>
                <form method="POST" name="contact" onSubmit={(e)=>this.sendEmail(e)}>
                    <div className="checkbox-div"><input type="checkbox" name="website" value={this.state.web_issue}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { if(this.state.web_issue) this.setState({ web_issue: false}); else this.setState({ web_issue: ev.target.value }); } } /><label>Website</label></div>
                    <div className="checkbox-div"><input type="checkbox" name="shipping" value={this.state.ship_issue}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { if(this.state.ship_issue) this.setState({ ship_issue: false}); else this.setState({ ship_issue: ev.target.value }); } } /><label>Shipping</label></div>
                    <div className="checkbox-div"><input type="checkbox" name="returns" value={this.state.returns}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { if(this.state.returns) this.setState({ returns: false}); else this.setState({ returns: ev.target.value }); } } /><label>Returns</label></div>
                    <div className="checkbox-div"><input type="checkbox" name="other" value={this.state.other}  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { if(this.state.other) this.setState({ other: false}); else this.setState({ other: ev.target.value }); }} /><label>Other</label></div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form4Example1">Email</label>
                        <input type="email" name="email" id="form4Example1" className="form-control" value={this.state.email} required onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: ev.target.value })}/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form4Example2">Subject</label>
                        <input type="text" id="form4Example2" name="subject" className="form-control" value={this.state.subject} required onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ subject: ev.target.value })}/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form4Example3">Message</label>
                        <textarea name="message" className="form-control" id="form4Example3" rows="4" minLength="12" value={this.state.text} required onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: ev.target.value })}></textarea>
                    </div>
                    <button className="btn btn-primary btn-block mb-4" type="submit"><h1>Send</h1></button>
                </form>
                <ToastContainer className="toasty" limit="1" />
            </div>
        );
    }
}

export default Form;