import React from "react";

//Takes props "size" and "posterPath" for size of poster and the path for the end part of the poster URL.
////TMDB API supported postersizes: w92, w154, w185, w342, w500, w780, and original.

const MoviePoster = (props) => {
    const baseURL = "https://image.tmdb.org/t/p/";
    const posterURL = baseURL+props.size+props.posterPath;
    return (

        props.posterPath ? (
            <img src={posterURL}></img>
        ) : (
            <img src="/imageplaceholder.jpg"></img>
        )
    );
};

MoviePoster.defaultProps = {
    size: "original"
};

export default MoviePoster;