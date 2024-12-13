import './FavoriteList.css';
import { useEffect, useState } from 'react';
import { getFavorites } from "../contexts/FavoriteProvider";
import { useUser } from '../contexts/useUser';


import MovieCard from '../components/MovieCard.js';



function FavoriteList({ idmovie, title, posterUrl }) {
  
  const [movies, ] = useState([]);
  const [favorites, ] = useState([]);
  const {getFavorites} = useState();
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async ( ) => {
      try {
         const response = await getFavorites(user.id);
        if (response && Array.isArray(response)) {
          console.log("response", response);
      } else {
        setError("No favorites available or invalid data.");
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Failed to load favorites. Please try again later.");
    } 
    };
    fetchFavorites();
    console.log("getFavorites", idmovie, title, posterUrl)
  },);

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