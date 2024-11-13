import React, { useState, useEffect } from 'react';
import './moviecarousel.css';

const MovieCarousel = () => {
  const movies = [
    { id: 1, title: 'Movie 1', image: 'https://via.placeholder.com/800x400?text=Movie+1' },
    { id: 2, title: 'Movie 2', image: 'https://via.placeholder.com/800x400?text=Movie+2' },
    { id: 3, title: 'Movie 3', image: 'https://via.placeholder.com/800x400?text=Movie+3' }
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

  return (
    <div className="movie-carousel">
      <img
        src={movies[currentMovieIndex].image}
        alt={movies[currentMovieIndex].title}
        className="movie-image slide-in"
      />
      <div className="movie-title">{movies[currentMovieIndex].title}</div>
    </div>
  );
};

export default MovieCarousel;
