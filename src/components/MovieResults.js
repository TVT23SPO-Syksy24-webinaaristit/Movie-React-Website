import React from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useFilters } from "../contexts/useFilters";
import useDebounce from "../contexts/useDebounce";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";

const MovieResults = () => {
    const {search, filters, searchToggle, page, totalPages, setTotalPages} = useFilters();
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState(new Set());
    const {user } = useUser();
    const {getFavorites} = useFavorites();
    const [refresh, setRefresh] = useState(false);


    const debouncedSearch = useDebounce(search,1000);
    const debouncedFilters = useDebounce(filters,1000);
    const debouncedPage = useDebounce(page, 100);
    const debouncedSearchToggle = useDebounce(searchToggle, 500);
        //axios.get(url, {headers})
        //.then(responseHandler)
        //.catch(errorHandler);


    const updateResults = useCallback(async () => {
        // Might add primary_release_year=2023 later to query
        console.log("API call made")
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
            }
        const discoverUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filters.sortBy}&with_genres=${filters.genres.join("%2C")}`;
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
        try{
        const url = searchToggle ? searchUrl : discoverUrl;
        let response = await axios.get(url, {headers});
        const limitedTotalPages = response.data.total_pages > 500 ? 500 : response.data.total_pages;
        setMovies(response.data.results);
        setTotalPages(limitedTotalPages);
        } catch (error) {
            errorHandler(error);
        }
    }, [filters, searchToggle, search, page, totalPages, setTotalPages]);

    const errorHandler = (error) => {
        console.log(error.response)
    }

    useEffect(() => {
        if(false) return;
        updateResults();
    }, [debouncedSearch, debouncedFilters, page, debouncedSearchToggle]);

    useEffect(() => {
        console.log(filters);
        console.log(movies)
    }, [debouncedSearch, debouncedFilters]);

    const toggleFavorite = (id) => {
        setFavoriteMovies((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id); // Remove favorite
            } else {
                newFavorites.add(id); // Add favorite
            }
            return newFavorites;
        });
    };

    const fetchFavorites = async () => {
        try {
          const favorites = await getFavorites();
          setFavoriteMovies(new Set(favorites.map(fav => fav.idmovie)));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
    
      useEffect(() => {
        fetchFavorites();
      }, [getFavorites]);

    const isFavorite = (id) => favoriteMovies.has(id);

    console.log("Movie Data:",movies);
    return(
        <div className="MovieResults">
        {movies && movies.length > 0 ? (
        movies.map(movie => (
            <MovieCard
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            isFavorited={isFavorite(movie.id)}
            onFavoriteAdded={fetchFavorites}
            refresh={refresh}
            setRefresh={setRefresh}
            />
        ))
        
        ) : (
            <div className="noresultsmsg">No Results</div>
            
        )
        }
        </div>
    );
};

export default MovieResults;