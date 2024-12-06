import './MovieDetails.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDebounce from '../contexts/useDebounce';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieReviews from '../components/MovieReviews';
import MovieInfo from '../components/MovieInfo';

const MovieDetailsPage = () => {
    const { id } = useParams();

    return(
        <div className="moviedetailspage">
            <Navbar />
            <div className="maincontent">
                <MovieInfo movieId={id}/>
                <MovieReviews movieId={id} />
            </div>
            <Footer />
        </div>
    )

};

export default MovieDetailsPage;