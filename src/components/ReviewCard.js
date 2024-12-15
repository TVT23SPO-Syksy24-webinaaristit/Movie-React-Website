import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReviewCard = (props) => {

    const [submitDate, setSubmitDate] = useState("");

    useEffect(() => {
        const date = new Date(props.review.timestamp);

        const year = date.getFullYear(); 
        const month = date.getMonth() + 1; 
        const day = date.getDate(); 

        setSubmitDate(`${day}.${month}.${year}`);
    }, [props.review.timestamp]);

    const displayStars = (reviewPoints) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= reviewPoints) {
                stars.push("★");  
            } else {
                stars.push("☆");  
            }
        }
    
        return stars;
    }

    return(
        <div className="reviewcard">
            <p style={{ display: 'inline-block' }}>{submitDate} ·</p>
            <Link to={`/profile/${props.review.authorId}`}>
            <p style={{ display: 'inline-block' }}>  author: {props.review.author}</p>
            </Link>
            
            <h2>{displayStars(props.review.reviewPoints)}</h2>
            <p>{props.review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;