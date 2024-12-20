import React from "react";
import "./Movies.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieFilters from "../components/MovieFilters";
import MovieSearch from "../components/MovieSearch";
import MovieResults from "../components/MovieResults";
import MoviePagination from "../components/MoviePagination";
import { useFilters } from "../contexts/useFilters";

const MoviesPage = () => {
    const { searchToggle } = useFilters();
    return (
        <div className="Movies">
            <Navbar />
            <div >
            <div className="moviefiltersearch">
            {searchToggle ? <MovieSearch /> : null}
            {!searchToggle ? <MovieFilters /> : null}
            </div>
            <MovieResults />
            <MoviePagination />
            </div>
            <Footer />
        </div>
    );
};

export default MoviesPage;