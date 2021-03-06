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
      };
      this.sendEmail = this.sendEmail.bind(this);
    }

    /**Send Email */
    async sendEmail(e) {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/sendEmail', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                subject: this.state.subject,
                email: this.state.email,
                text: this.state.text,
            }) 
        }).then(response => {
            if(response) {
                toast("Email Sent!", { type: 'success' });
                this.setState({ email: '', subject: '', text: '', });
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
                <h1 id="contact-header"><b>Contact Form:</b></h1>
                <form method="POST" name="contact" onSubmit={(e)=>this.sendEmail(e)}>
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