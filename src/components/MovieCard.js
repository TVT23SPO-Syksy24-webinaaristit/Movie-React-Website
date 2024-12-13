import React, { useEffect, useState } from 'react';
import "./MovieCard.css";
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";
import { Link } from 'react-router-dom';

const MovieCard = ({ movieId, title, posterPath, isFavorited ,onFavoriteAdded, refresh, setRefresh }) => {



    useEffect(() => {
        console.log("Url:", posterPath);
    }, [posterPath]);

    return (
        <div className="MovieCard">
            <div className="moviecardposter">
                <Link className="detailsLink" to={`:${movieId}`}>
                    <MoviePoster size="original" posterPath={posterPath} />
                </Link>
            </div>
            <Link className="detailsLink" to={`:${movieId}`}>
                <h3>{title}</h3>
            </Link>
            <FavoriteButton refresh={refresh} 
            setRefresh={setRefresh}
            isFavorite={isFavorited}
            onFavoriteAdded={onFavoriteAdded}
            idmovie={movieId} title={title} posterUrl={posterPath} />
        </div>
    );
};

export default MovieCard;