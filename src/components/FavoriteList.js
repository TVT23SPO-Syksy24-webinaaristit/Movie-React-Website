import React, { useState, useEffect } from 'react';

function FavoriteList() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch the user's favorite movies from the server
    /*fetch('/api/user/favorites')
      .then(response => response.json())
      .then(data => setFavoriteMovies(data.favoriteMovies));*/
  }, []);

  return (
    <div>
      <h2>Favorite Movies</h2>
      <ul>
        {favoriteMovies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;