import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/useUser";
import ReviewCard from "./ReviewCard";

const MovieReviews = (props) => {
    const url = process.env.REACT_APP_API_URL;
    const { user } = useUser();
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const hasRun = useRef(false);
    const reviewSubmitted = false;

    useEffect(() => {
        if (hasRun.current) return;
        const getReviews = async () => {
            const headers = {"movieid":props.movieId.toString()};
            try {
                const response = await axios.get(url+"/reviews",{headers});
                setReviews(response.data);
            } catch(error) {
                throw error.response.data;
            }
        }
        getReviews();
        hasRun.current = true;
    }, [props]);

    useEffect(() => {
        console.log(props.movieId)
        console.log("reviews");
        console.log(reviews);
    }, [reviews, props.movieId]);

    useEffect(() => {
        console.log(reviewText);
        console.log(stars);
    }, [reviewText, stars]);

    const postReview = async () => {
        const json = {
            "movieid": props.movieId.toString(),
            "reviewpoints": stars,
            "reviewtext": reviewText,
            "userid": user.id,
        };
        const headers = {
            Authorization: user.token,
        };
        try{
            const response = await axios.post(url+"/reviews/add",json,{ headers });
            if(response.status === 200){
                document.getElementsByClassName("reviewsubmit")[0].innerHTML=`<h3>Review submitted successfully</h3>`;
            }
        } catch(error) {
            console.error(error.response);
            alert(error.response.data.error);
        }
    }

    const inputHandler = (event) => {
        setReviewText(event.target.value);
    }

    const starHandler = (value) => {
        setStars(value);
      };

    const submitHandler = () => {
        postReview();
    }

    return(
        <div className="moviereviews">
            <div className="reviewresults">
            <h2>Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                    ) : (
                    <div className="noresultsmsg">No Reviews</div>
                    
                    )
                }
            </div>
            <div className="reviewsubmit">
                {user && user.token ? 
                (<>
                <h3>Submit review</h3>

                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                        key={value}
                        className="star-button"
                        data-value={value}
                        onClick={() => starHandler(value)}
                        >
                        {value <= stars ? '★' : '☆'}
                        </button>
                    ))}
    
                    <textarea 
                    className="reviewinput"
                    rows={5} 
                    columns={50}
                    onChange={inputHandler}
                    placeholder="Review text here...(max. 1000 characters)"
                    maxLength={1000}
                    />
    
                    <button className="reviewsubmitbutton" onClick={submitHandler}>Submit</button></>)
                :
                (<a href="/login"><h3>Sign Up to leave a review</h3></a>)
                }
                
            </div>
        </div>
    )
}

export default MovieReviews;