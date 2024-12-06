import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MoviePoster from "./MoviePoster";

const MovieInfo = (props) => {
    const id = props.movieId;
    const [details, setDetails] = useState({})

    useEffect(() => {
        const getMovieDetails = async () => {
            const headers = {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
                }
            try{
            const url = `https://api.themoviedb.org/3/movie/${id.slice(1)}?language=en-US`;
            let response = await axios.get(url, {headers});
            setDetails(response.data);
            } catch (error) {
                errorHandler(error);
            }
            
        }
        const errorHandler = (error) => {
            console.log(error.response)
        }
            console.log("getMovieDetails ran")
            getMovieDetails();
        
    }, [id])

    useEffect(() => {
        console.log(details)
        console.log(id)
    }, [details]);
    return(
        <div style={details.backdrop_path ? 
            {
                backgroundImage: `url(${`https://image.tmdb.org/t/p/original${details.backdrop_path}`})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
            : 
            {}
        } className="movieinfo">
        <h3>MovieInfo</h3>
        <MoviePoster size="original" posterPath={details.poster_path.slice(1)} />
        </div>
    )
}

export default MovieInfo;