import React, { Component } from 'react';
import './Forms.scss';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subject:'',
            email: '',
            text: ''
        }
        this.Send = this.Send.bind(this);
    }

    async Send(e) {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                subject: this.state.subject,
                email: this.state.email,
                text: this.state.text 
            }) 
        }).then(response => {
            console.log("Message Sent");
        }).catch(e => {
            console.log(e);
        });
    }

    render(){
        return(
            <div className='Contact'>
                <h1 id="contact-header"><b>Contact Form:</b></h1>
                <form onSubmit={this.Send}>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example1">Email</label>
                        <input type="email"  id="form4Example1" class="form-control" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: ev.target.value })}/>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example2">Subject</label>
                        <input type="text" id="form4Example2" class="form-control" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ subject: ev.target.value })}/>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example3">Message</label>
                        <textarea class="form-control" id="form4Example3" rows="4" minLength="12" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: ev.target.value })}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4"><h1>Send</h1></button>
                </form>
          </div>
        );
    }

}

export default Form;