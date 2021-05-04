import React from 'react';
import './Review.scss';
import netlifyIdentity from "netlify-identity-widget";
import StarRatingComponent from 'react-star-rating-component';

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            review: 5,
            ratings: null,
            text: '',
            users: [],
            reviews: [],
        };
        this.createReview = this.createReview.bind(this);
        this.display = this.display.bind(this);
    }

    display() {
        if(this.state.reviews.length === 0) {
            return (<h1 style={{textAlign:"center"}}><b>Be the first to review!</b></h1>)
        } else {
            let posts = [];
            for(let i = 0; i < this.state.reviews.length; i++) {
                posts.push(
                    <div>
                        <h2 style={{textDecoration:"underline", marginLeft:"7%"}}><b>user: {this.state.users[i]}</b></h2>
                        <StarRatingComponent 
                            name="user-stars" 
                            starCount={5}
                            value={this.state.ratings[i]}
                            className="user-stars"
                        />
                        <p>Review: {this.state.reviews[i]}</p>
                        <hr style={{width:"90%"}}/>
                    </div>
                )
            }
            return posts;
        }
    }

    onStarClick(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({review: nextValue});
    }

    componentDidMount() {
        fetch('http://localhost:9000/getReviews', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                review_id: this.props.Info.metadata.review_id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ reviews: data.reviews, users: data.users, ratings: data.ratings });
        }).catch(err => console.log(err));
    }

    async createReview(e) {
        e.preventDefault();
        if(netlifyIdentity.currentUser()) {
            await fetch('http://localhost:9000/createReview', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.Info.id, 
                review_id: this.props.Info.metadata.review_id,
                reviews: this.state.reviews, // 
                users: this.state.users, // 
                ratings: this.state.ratings, // 
                rating: this.state.review,
                user: netlifyIdentity.currentUser().user_metadata.full_name,
                review: this.state.text,
            }),
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        } else {
            console.log("need to sign up display");
        }
        
    }

    render() {
        return(
            <div className="review">
                <StarRatingComponent 
                    name="edit-stars" 
                    starCount={5}
                    value={this.state.review}
                    className="center"
                    onStarClick={this.onStarClick.bind(this)}
                />
                <p><b>Write a Review (max: 300 characters): </b></p>
                <form onSubmit={this.createReview}>
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
