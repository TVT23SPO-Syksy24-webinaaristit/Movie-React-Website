
import React from "react";
import "./MovieCard.css";
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

const MovieCard = ({ movieId, title, posterPath, isFavorited, showFavoriteButton, onFavoriteAdded }) => {
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
      
      {showFavoriteButton && (
      <FavoriteButton
        idmovie={movieId}
        title={title}
        posterUrl={posterPath}
        isFavorited={isFavorited}
        onFavoriteAdded={onFavoriteAdded} // Callback to refresh favorites
      />
      )}
    </div>
  );
};

export default MovieCard;
