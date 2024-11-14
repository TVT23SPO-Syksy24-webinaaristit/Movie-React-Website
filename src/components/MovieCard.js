import React from "react";
import "./MovieCard.css"

const MovieCard = (props) => {
    return(
        <div className="MovieCard">    
            <h1>{props.title}</h1>
        </div>
    );
};

export default MovieCard;