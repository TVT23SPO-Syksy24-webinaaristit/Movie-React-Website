import React from "react";
import "./Movies.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieFilters from "../components/MovieFilters";
import MovieSearch from "../components/MovieSearch";
import MovieResults from "../components/MovieResults";

function Movies() {
    return (
        <div className="Movies">
            <Navbar />
            <MovieFilters />
            <MovieSearch />
            <MovieResults />
            <Footer />
        </div>
    );
};

export default Movies;