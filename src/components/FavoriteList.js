import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/useUser';
import axios from 'axios';

import MovieCard from '../components/MovieCard.js';

const url = 'http://localhost:3001/api/favorites/getfavorites';

function FavoriteList() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        alert('An error occurred while fetching your favorites. Please try again later.');
      }
    };

    fetchFavorites();
  }, []);

  const addToFavorites = (movie) => {
    const headers = { headers: { Authorization: user.token } }

    // Modify API call based on your backend logic for adding favorites
    axios.post(url + "/api/favorites/insertfavorites", { movieId: movie.id }, headers) // Example API call
      .then(response => {
        addToFavorites([...favorites, movie]) // Update favorites list
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }

  const removeFromFavorites = (movieId) => {
    const headers = { headers: { Authorization: user.token } }

    // Modify API call based on your backend logic for removing favorites
    axios.delete(url + "/favorites/remove/" + movieId, headers) // Example API call
      .then(response => {
        setFavorites(favorites.filter(movie => movie.id !== movieId)) // Update favorites list
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }

  return (
    <div id="container">
      <h3>Movies</h3>
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((favMovie) => favMovie.id === movie.id)}
          >
      
          </MovieCard>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;