// import React, { useEffect, useState } from 'react';
// import "./MovieCard.css"
// import MoviePoster from "./MoviePoster";
// import FavoriteButton from "./FavoriteButton";
// import { Link } from 'react-router-dom';

// const MovieCard = (props) => {
//     const [isFavorite, setIsFavorite] = useState(false);

//     useEffect(() => {
//         console.log(posterPath)
//     }, [posterPath]);
    
//     const toggleFavorite = () => {
//         setIsFavorite(!isFavorite);
//       };
    
//     return(
//         <div className="MovieCard">
//             <div className="moviecardposter">
//                 <Link className="detailsLink" to={`:${props.movieId}`}>
//                 <MoviePoster size="original" posterPath={props.posterPath} /> 
//                 </Link>
//             </div>
//             <Link className="detailsLink" to={`:${props.movieId}`}>
//             <h3>{props.title}</h3>
//             </Link>
//             <FavoriteButton isFavorite={isFavorite} onToggleFavorite={toggleFavorite} idmovie={props.movieId} title={props.title} posterPath={props.posterPath} />
//         </div>
//     );
// };

// export default MovieCard;

import React, { useEffect, useState } from 'react';
import "./MovieCard.css";
import MoviePoster from "./MoviePoster";
import FavoriteButton from "./FavoriteButton";
import { Link } from 'react-router-dom';

const MovieCard = ({ movieId, title, posterPath }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log("Url:", posterPath);
    }, [posterPath]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

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
            <FavoriteButton isFavorite={isFavorite} onToggleFavorite={toggleFavorite} idmovie={movieId} title={title} posterUrl={posterPath} />
        </div>
    );
};

export default MovieCard;