import './FavoriteList.css'
import { useEffect, useState } from "react"
import { useUser } from "../contexts/useUser"
import axios from "axios"
import MovieCard from '../components/MovieCard' 
import FavoriteButton from '../components/FavoriteButton';

const url = "https://api.themoviedb.org/3/search/movie?api_key=REACT_APP_TMDB_API_KEY&query=movie_title"

function FavoriteList() {
  const { user } = useUser()
  const [movies, setMovies] = useState([]) // Stores movie data
  const [favorites, setFavorites] = useState([]) // Stores user's favorite movies

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setMovies(response.data) // Assuming response.data contains movie data
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }, [])

  const addToFavorites = (movie) => {
    const headers = { headers: { Authorization: user.token } }

    // Modify API call based on your backend logic for adding favorites
    axios.post(url + "/api/favorites", { movieId: movie.id }, headers) // Example API call
      .then(response => {
        setFavorites([...favorites, movie]) // Update favorites list
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
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} isFavorite={favorites.some(favMovie => favMovie.id === movie.id)}>
            <FavoriteButton 
              isFavorited={favorites.some(favMovie => favMovie.id === movie.id)}
              onFavorite={() => addToFavorites(movie)}
              onUnfavorite={() => removeFromFavorites(movie.id)}
            />
          </MovieCard>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;