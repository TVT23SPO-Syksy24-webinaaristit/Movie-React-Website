import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MoviePoster from "./MoviePoster";
import MovieInfoText from "./MovieInfoText";

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
            const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
        
    },[id])

    useEffect(() => {
        console.log(details)
        console.log(id)
    }, [details]);

    return(
        <div className="movieinfo">
        {details?.poster_path ? (
            <div className="postercontainer">
                <MoviePoster size="original" posterPath={details.poster_path} />
            </div>
            ) : 
            (null)}
            <MovieInfoText details={details}/>
        </div>
    )
}

export default MovieInfo;