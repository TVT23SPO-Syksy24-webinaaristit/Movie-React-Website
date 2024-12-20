import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from '../contexts/useUser';
import MovieCard from '../components/MovieCard.js';

function FavoriteList({ accounts_idaccount }) {
  const [movies, setMovies] = useState([]); // Replace with actual movie fetching logic if needed
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { getFavorites } = useFavorites(); // Correctly access getFavorites
  const { user } = useUser(); // Assuming this provides the logged-in user

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = accounts_idaccount || (user && user.id);
        if (!userId) {
          setError("User not logged in.");
          return;
        }
        const response = await getFavorites(userId); // Pass the user ID as a parameter
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
    <div id="container-favorites">
      <h3>Favorite Movies</h3>
      {error && <p className="error">{error}</p>}
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <MovieCard
              movieId={fav.idmovie}
              title={fav.title}
              posterPath={fav.poster_url} // Ensure this is correctly mapped
              showFavoriteButton={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
