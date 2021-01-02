import React from 'react';
import './Forms.scss';

class Form extends React.Component {

    render(){
        return(
            <div className='Contact'>
                <h1 id="contact-header"><b>Contact Form:</b></h1>
                <form>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example1">Name</label>
                        <input type="text" id="form4Example1" class="form-control" />
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example2">Email address</label>
                        <input type="email" id="form4Example2" class="form-control" />
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form4Example3">Message</label>
                        <textarea class="form-control" id="form4Example3" rows="4"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4"><h1>Send</h1></button>
                </form>
          </div>
        );
    }

}

export default Form;