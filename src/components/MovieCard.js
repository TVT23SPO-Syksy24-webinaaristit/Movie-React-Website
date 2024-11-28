import React, { useState } from 'react';
import "./MovieCard.css"
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";

const MovieCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
      };

    return(
        <div className="MovieCard">
            <div className="moviecardposter">
            <MoviePoster size="w185" posterPath={props.posterPath} /> </div>
            <h3>{props.title}</h3>
            <FavoriteButton isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />

        </div>
    );
};

export default MovieCard;