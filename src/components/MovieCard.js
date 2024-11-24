import React from "react";
import "./MovieCard.css"
import MoviePoster from "./MoviePoster";

const MovieCard = (props) => {
    return(
        <div className="MovieCard">
            <MoviePoster size="w185" posterPath={props.posterPath} /> 
            <h3>{props.title}</h3>
        </div>
    );
};

export default MovieCard;