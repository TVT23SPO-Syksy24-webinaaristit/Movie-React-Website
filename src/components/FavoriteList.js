import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { useFavorites } from "../contexts/FavoriteProvider"; // Use the hook
import { useUser } from '../contexts/useUser';

import MovieCard from '../components/MovieCard.js';

function FavoriteList() {
  const [movies, setMovies] = useState([]); // Replace with actual movie fetching logic if needed
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { getFavorites } = useFavorites(); // Access getFavorites via the hook
  const { user } = useUser(); // Assuming this provides the logged-in user

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user || !user.id) {
          setError("User not logged in.");
          return;
        }
        const response = await getFavorites();
        if (response && Array.isArray(response)) {
          setFavorites(response);
        } else {
          setError("No favorites available or invalid data.");
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites. Please try again later.");
      }
    };

    fetchFavorites();
  }, [user, getFavorites]); // Ensure the effect runs when user or getFavorites changes

  return (
    <div id="container">
      <h3>Movies</h3>
      {error && <p className="error">{error}</p>}
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((favMovie) => favMovie.id === movie.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
