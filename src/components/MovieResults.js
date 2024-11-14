import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useFilters } from "../contexts/useFilters";

const MovieResults = () => {
    const {filters, setFilter} = useFilters();
    
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${filters.page}&primary_release_year=2023&sort_by=${filters.sortBy}&with_genres=${filters.genres.join("%2C")}`;
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer INSERT API TOKEN HERE'
    }
    axios.get(url, {headers})
    .then(response => {
        console.log(response.data)
        return response.data;
    }).catch(error => {
        console.log(error.response)
        return error.response;
    });

    return(
        <div className="MovieResults">
        <h1>MovieResults</h1>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        </div>
    );
};

export default MovieResults;