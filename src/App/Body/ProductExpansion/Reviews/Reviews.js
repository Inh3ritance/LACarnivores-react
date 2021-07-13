import React from 'react';
import './Review.scss';
import netlifyIdentity from "netlify-identity-widget";
import StarRatingComponent from 'react-star-rating-component';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            review: 5,
            ratings: null,
            text: '',
            users: [],
            reviews: [],
            dates: [],
            complaintIndex: -1,
            complaint: '',
        };
        this.displayComplaint = this.displayComplaint.bind(this);
        this.createReviewFunc = this.createReviewFunc.bind(this);
        this.display = this.display.bind(this);
        this.identityRender = this.identityRender.bind(this);
        this.getReviews = this.getReviews.bind(this);
        this.createReview = this.createReview.bind(this);
    }

    getReviews() {
        fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/getReviews', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                review_id: this.props.Info.metadata.review_id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ reviews: data.reviews, users: data.users, ratings: data.ratings, dates: data.dates });
        }).catch(err => console.log(err));
    }

    async createReview() {
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/createReview', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.Info.id, 
                review_id: this.props.Info.metadata.review_id,
                rating: this.state.review,
                user: netlifyIdentity.currentUser().user_metadata.full_name,
                review: this.state.text,
            }),
        }).then(data => {
            console.log(data);
            toast("Review Succesfull!");
            // Form reset
            document.getElementById("reviewForm").reset();
            this.getReviews();
        }).catch(err => {
           console.log(err);
           toast("Review not succesfull!", { type: 'error' });
        });
    }

    display() {
        if(this.state.reviews.length === 0) {
            return (<h1 style={{textAlign:"center"}}><b>Be the first to review!</b></h1>);
        } else {
            let posts = [];
            for(let i = 0; i < this.state.reviews.length; i++) {
                posts.push(
                    <div className="review-box" key={i}>
                        <h2 style={{textDecoration:"underline", marginLeft:"7%"}}><b>From: {this.state.users[i]}</b></h2>
                        <h2 style={{marginLeft:"7%"}}>Date: {this.state.dates[i]}</h2>
                        <StarRatingComponent 
                            name="user-stars" 
                            starCount={5}
                            value={this.state.ratings[i]}
                            className="user-stars"
                        />
                        <p style={{wordWrap:"break-word"}}>Review: {this.state.reviews[i]}</p>
                        <button id="flag" onClick={() => this.setState({complaintIndex: i})}><p><u>&#9873; as inappropriate</u></p></button>
                        { this.displayComplaint(i, this.state.reviews[i], this.state.users[i]) }
                        <hr style={{width:"90%"}}/>
                    </div>
                );
            }
            return posts;
        }
    }

    displayComplaint(i, review, user) {
        if(this.state.complaintIndex === i) {
            return(
            <form onSubmit={(e) => this.reportComplaint(e, review, user)}>
                <h2>What is the complaint for this review?</h2>
                <h5>Complaints are anonymous and reviewed by our staff.</h5>
                <textarea type="textbox" className="pad" maxLength="300" minLength="15" style={{marginTop: "2%"}} onKeyDown={(e)=>{if(e.key === "Enter") e.preventDefault();}} onChange={(e)=>this.setState({complaint: e.currentTarget.value})}></textarea>
                <button className="pad submit-review" onClick={() => this.setState({complaintIndex: -1})}><h3>Cancel</h3></button>
                <button type ="submit" className="pad submit-review"><h3>Submit Complaint</h3></button>
            </form>
            );
        } else {
            return(null);
        }
    }

    async reportComplaint(e, review, user) {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/reportReview', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                complaint: this.state.complaint,
                id: this.props.Info.id,
                review,
                user,
            }),
        }).then(data => {
            console.log(data);
            toast("Report Succesfull!");
            // Form reset
            this.setState({complaintIndex: -1, complaint: ''});
            this.getReviews();
        }).catch(err => {
           console.log(err);
           toast("Report not succesfull!", { type: 'error' });
        });
    }

    onStarClick(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({review: nextValue});
    }

    componentDidMount() {
        this.getReviews();
    }

    async createReviewFunc(e) {
        e.preventDefault();
        if(netlifyIdentity.currentUser()) {
           await this.createReview();
        } else {
            console.log("need to sign up display");
        }
    }

    identityRender() {
        if(netlifyIdentity.currentUser()) {
            return(null);
        } else {
            return (<p style={{ color: "red" }}>*Please sign in to write a review</p>);
        }
    }

    render() {
        return(
            <div className="review">
                <div className="center">
                <StarRatingComponent 
                    name="edit-stars" 
                    starCount={5}
                    value={this.state.review}
                    onStarClick={this.onStarClick.bind(this)}
                />
                </div>
                { <this.identityRender /> }
                <p><b>Write a Review (max: 300 characters) </b></p>
                <form onSubmit={this.createReviewFunc} id="reviewForm">
                <textarea onKeyDown={(e)=>{if(e.key === "Enter") e.preventDefault();}} onChange={(e)=>this.setState({text: e.currentTarget.value})} type="textbox" className="pad" maxLength="300" minLength="15"></textarea>
                <button type="submit" className="pad submit-review"><h3>Submit review</h3></button>
                </form>
                <hr id="review-seperator"/>
                { <this.display />}
                <p className="end"></p>
            </div>
        );
    };
}

export default Review;
