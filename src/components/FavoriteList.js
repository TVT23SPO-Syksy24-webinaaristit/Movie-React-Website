import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { getFavorites } from "../contexts/FavoriteProvider";
import { useUser } from '../contexts/useUser';


import MovieCard from '../components/MovieCard.js';



function FavoriteList() {
  
  const [movies, ] = useState([]);
  const [favorites, ] = useState([]);
  const {getFavorites} = useState();

  useEffect(() => {
    const getFavorites = async () => {
      try {
      
      } catch (error) {
        console.error('Error fetching favorites:', error);
        alert('An error occurred while fetching your favorites. Please try again later.');
      }
    };

    getFavorites();
  }, []);

  console.log(favorites)

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