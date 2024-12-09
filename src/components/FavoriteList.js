import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/useUser';
import axios from 'axios';

import MovieCard from '../components/MovieCard.js';

const url = 'http://localhost:3001/api/favorites/getfavorites';

function FavoriteList() {
  const { User } = useUser();
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