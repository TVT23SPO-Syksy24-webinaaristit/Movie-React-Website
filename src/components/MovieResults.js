import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useFilters } from "../contexts/useFilters";
import useDebounce from "../contexts/useDebounce";
import { useFavorites } from "../contexts/FavoriteProvider";

const MovieResults = () => {
  const { search, filters, searchToggle, page, setTotalPages } = useFilters();
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState(new Set());
  const { getFavorites } = useFavorites();

  const debouncedSearch = useDebounce(search, 1000);
  const debouncedFilters = useDebounce(filters, 1000);
  const debouncedSearchToggle = useDebounce(searchToggle, 500);

  const fetchFavorites = useCallback(async () => {
    try {
      const favorites = await getFavorites();
      setFavoriteMovies(new Set(favorites.map((fav) => fav.idmovie)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, [getFavorites]);

  // Fetch movies based on search and filters
  const updateResults = useCallback(async () => {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
    };
    const discoverUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filters.sortBy}&with_genres=${filters.genres.join("%2C")}`;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;

    try {
      const url = searchToggle ? searchUrl : discoverUrl;
      const response = await axios.get(url, { headers });
      const limitedTotalPages = Math.min(response.data.total_pages, 500);
      setMovies(response.data.results);
      setTotalPages(limitedTotalPages);
    } catch (error) {
      console.error("Error fetching movies:", error.response || error);
    }
  }, [filters, searchToggle, search, page, setTotalPages]);

  useEffect(() => {
    fetchFavorites(); // Initial load of favorites
  }, [fetchFavorites]);

  useEffect(() => {
    updateResults();
  }, [debouncedSearch, debouncedFilters, page, debouncedSearchToggle]);

  const isFavorite = (id) => favoriteMovies.has(id);

  return (
    <div className="MovieResults">
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            isFavorited={isFavorite(movie.id)}
            onFavoriteAdded={fetchFavorites} // Refresh favorites after adding
            showFavoriteButton={true}
          />
        ))
      ) : (
        <div className="noresultsmsg">No Results</div>
      )}
    </div>
  );
};

export default MovieResults;
