import React from "react";

const ReviewCard = (props) => {

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
            <p>{props.review.timestamp} · author: {props.review.author}</p>
            <h2>{displayStars(props.review.reviewPoints)}</h2>
            <p>{props.review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;