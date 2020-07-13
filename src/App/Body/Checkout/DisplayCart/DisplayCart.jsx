import React, { Component } from 'react';
import '../CheckoutForm.scss';
import Carousel from 'react-bootstrap/Carousel';
import { total, list, remove } from 'cart-localstorage';

class DisplayCart extends Component {

    /*Initialize Local Storage */
    constructor(props) {
        super(props);
        this.state = {
            data: list()
        }
    }

    /*Remove Item from localStorage */
    RemoveItemFromCart(productID) {
        console.log("delete item: ", productID);
        remove(productID);
        this.setState({data: list() })
        this.props.rerenderCheckout();
    }

    /*Updates localStorage onClick, Force Refresh*/
    componentDidUpdate(){
        if(this.state.data.length !== list().length && this.state.data.length !== 0 ) this.setState({ data: list()});
    }

    /*Revalidate Initialzation in State */
    componentDidMount() {
        this.setState({ data: list() })
    }

    render() {
        if (this.state.data.length !== 0) {
            return (
                <div className="displayCart">
                    <h1>Shopping Cart: </h1>
                    <Carousel className="cartCarousel carousel-fade">
                        {
                            this.state.data.map(item => (
                                <Carousel.Item key={item.id} className="carouselImages">
                                    <img src={item.image[0]} alt="Product" />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                    {
                        this.state.data.map(item => (
                            <div key={item.id} className="CartItems">
                                <div className="itemNameQuant">
                                    <h2><b>{item.quantity}</b> X {item.name}</h2>
                                </div>
                                <button className="removeItem" onClick={this.RemoveItemFromCart.bind(this, item.id)}>
                                <svg className="bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                                </button>
                                <h2>Price: ${(item.price * item.quantity).toFixed(2)}</h2>
                            </div>
                        ))
                    }

                    <h4>Subtotal: ${total().toFixed(2)}</h4>
                </div>
            )
        }
        else {
            return (<div className="displayCart"><h1>Shopping Cart: Empty</h1></div>)
        }
    }
}

export default DisplayCart;