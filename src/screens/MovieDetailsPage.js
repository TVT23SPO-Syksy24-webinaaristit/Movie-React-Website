import './MovieDetails.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
    const { id } = useParams();
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
            setDetails(response);
            } catch (error) {
                errorHandler(error);
            }
            
        }
        const errorHandler = (error) => {
            console.log(error.response)
        }

        getMovieDetails();
    }, [id])

    useEffect(() => {
        console.log(details)
    }, [details]);

};

export default MovieDetailsPage;