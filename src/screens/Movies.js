import React from "react";
import "./Movies.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieFilters from "../components/MovieFilters";
import MovieSearch from "../components/MovieSearch";
import MovieResults from "../components/MovieResults";
import { useFilters } from "../contexts/useFilters";

function Movies() {
    const { filters, setFilter } = useFilters();
    return (
        <div className="Movies">
            <Navbar />
            <div className="moviefiltersearch">
            <MovieSearch />
            {filters.showFilters ? <MovieFilters /> : null}
            </div>
            <MovieResults />
            <Footer />
        </div>
    );
};

export default Movies;