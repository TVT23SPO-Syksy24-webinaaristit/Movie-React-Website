import React from "react";
import { useState, useEffect } from "react";
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
            <p>{submitDate} · author: {props.review.author}</p>
            <h2>{displayStars(props.review.reviewPoints)}</h2>
            <p>{props.review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;