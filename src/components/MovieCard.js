import React from "react";
import "./MovieCard.css"
import MoviePoster from "./MoviePoster";

const MovieCard = (props) => {
    return(
        <div className="MovieCard">
            <div className="moviecardposter">
            <MoviePoster size="w185" posterPath={props.posterPath} /> </div>
            <h3>{props.title}</h3>
        </div>
    );
};

export default MovieCard;