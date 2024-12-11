import React, { useState } from 'react';
import "./MovieCard.css"
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    
    
   
    
    return(
        <div className="MovieCard">
            <div className="moviecardposter">
                <Link className="detailsLink" to={`:${props.movieId}`}>
                <MoviePoster size="original" posterPath={props.posterPath} /> 
                </Link>
            </div>
            <Link className="detailsLink" to={`:${props.movieId}`}>
            <h3>{props.title}</h3>
            </Link>
            <FavoriteButton isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        </div>
    );
};

export default MovieCard;