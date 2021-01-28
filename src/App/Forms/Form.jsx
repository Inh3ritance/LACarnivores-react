import React from 'react';
import './Forms.scss';

const Form = () => {
    return(
        <div className='Contact'>
            <h1 id="contact-header"><b>Contact Form:</b></h1>
            <form method="POST" data-netlify="true" data-netlify-recaptcha="true" name="contact">
            <input type="hidden" name="contact" value="contact" />
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example1">Email</label>
                    <input type="email" name="email"  id="form4Example1" className="form-control"/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example2">Subject</label>
                    <input type="text" id="form4Example2" name="subject" className="form-control"/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form4Example3">Message</label>
                    <textarea name="message" className="form-control" id="form4Example3" rows="4" minLength="12"></textarea>
                </div>
                <div data-netlify-recaptcha="true"></div>
                <button type="submit" className="btn btn-primary btn-block mb-4"><h1>Send</h1></button>
            </form>
        </div>
    );

}

export default Form;