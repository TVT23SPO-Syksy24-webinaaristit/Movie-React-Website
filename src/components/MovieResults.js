import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useFilters } from "../contexts/useFilters";

const MovieResults = () => {
    const {filters, setFilter} = useFilters();
    const [movies, setMovies] = useState([]);
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer INSERT TMDB API TOKEN HERE'
        }
        //axios.get(url, {headers})
        //.then(responseHandler)
        //.catch(errorHandler);

    useEffect(() => {
        if(true) return;
        updateResults();
    }, [filters]);

    const updateResults = async () => {
        try{
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${filters.page}&primary_release_year=2023&sort_by=${filters.sortBy}&with_genres=${filters.genres.join("%2C")}`;
        let response = await axios.get(url, {headers});
        setMovies(response.data.results);
        } catch (error) {
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        console.log(error.response)
    }

    return(
        <div className="MovieResults">
        <h1>MovieResults</h1>
        {movies && movies.length > 0 ? (
        movies.map(movie => (
            <MovieCard key={movie.id} title={movie.title} />
        ))
        ) : (
            <p>Loading...</p>
        )
        }
        </div>
    );
};

export default MovieResults;