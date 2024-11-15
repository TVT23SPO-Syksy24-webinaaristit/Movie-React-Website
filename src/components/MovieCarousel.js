import React, { useState, useEffect } from 'react';
import './MovieCarousel.css';

const MovieCarousel = () => {
  const movies = [
    { id: 1, title: 'Movie 1'},
    { id: 2, title: 'Movie 2'},
    { id: 3, title: 'Movie 3'}
  ];

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [movies.length]);

  const currentMovie = movies[currentMovieIndex];

  return (
    <div className="movie-carousel">
      <div key={currentMovie.id} className="movie-container slide-in">
        <div className="movie-image">
          <div className="placeholder-text">Movie Placeholder</div>
        </div>
        <div className="movie-title">{currentMovie.title}</div>
      </div>
    </div>
  );
};

export default MovieCarousel;
