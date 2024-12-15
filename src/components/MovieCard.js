
import React from "react";
import "./MovieCard.css";
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";
import AddToGroupHighlightDropdown from "./AddToGroupHighlightDropdown";

const MovieCard = ({ movieId, title, posterPath, isFavorited, showFavoriteButton, onFavoriteAdded }) => {
  return (
    <div className="MovieCard">
      <div className="moviecardposter">
        <Link className="detailsLink" to={`/movies/:${movieId}`}>
          <MoviePoster size="original" posterPath={posterPath} />
        </Link>
      </div>
      <Link className="detailsLink" to={`/movies/:${movieId}`}>
        <h3>{title}</h3>
      </Link>
      
      {showFavoriteButton && (
        <div>
      <FavoriteButton
        idmovie={movieId}
        title={title}
        posterUrl={posterPath}
        isFavorited={isFavorited}
        onFavoriteAdded={onFavoriteAdded} // Callback to refresh favorites
      />
        <AddToGroupHighlightDropdown 
        image={`https://image.tmdb.org/t/p/original${posterPath}`}
        title={title}
        idevent={movieId}
        description={"Have a look at this movie!"}
        sourceUrl={`/movies/:${movieId}`}
        dropdownlocation={1}
        />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
