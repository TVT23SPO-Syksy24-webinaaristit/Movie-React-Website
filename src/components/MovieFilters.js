import React from "react";
import { useFilters } from "../contexts/useFilters";

const MovieFilters = () => {
    const {filters, setFilter, setSearchToggle, setPage} = useFilters();

    const idToGenre = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };

    const removeGenre = (genreID) => {
        const filteredGenres = filters.genres.filter((genre) => genre !== genreID)
        setFilter({...filters, genres: filteredGenres});
    }


    return(
        <div className="MovieFilters">
            <div className="buttontitle">
            <h3>Discover</h3>
            <button className="modeSwitch" onClick={() => {
            setPage(1);
            setSearchToggle(true);
            }}>Switch to Search</button>
            </div>
            <div className="filterselector">
            <div><h4>Sort By</h4></div>
            <select name="sortBy" onChange={(event) => setFilter({...filters, sortBy: event.target.value})}>
                <option value="original_title.asc">Original Title (Ascending)</option>
                <option value="original_title.desc">Original Title (Descending)</option>
                <option value="popularity.asc">Popularity (Ascending)</option>
                <option value="popularity.desc" selected>Popularity (Descending)</option>
                <option value="revenue.asc">Revenue (Ascending)</option>
                <option value="revenue.desc">Revenue (Descending)</option>
                <option value="primary_release_date.asc">Release Date (Ascending)</option>
                <option value="title.asc">Title (Ascending)</option>
                <option value="title.desc">Title (Descending)</option>
                <option value="primary_release_date.desc">Release Date (Descending)</option>
                <option value="vote_average.asc">Vote Average (Ascending)</option>
                <option value="vote_average.desc">Vote Average (Descending)</option>
                <option value="vote_count.asc">Vote Count (Ascending)</option>
                <option value="vote_count.desc">Vote Count (Descending)</option>
            </select>
            <div><h4>Genre</h4></div>
            <select name="genre" defaultValue=""
            onChange={(event) => {
                const selectedGenre = parseInt(event.target.value)
                if (!filters.genres.includes(selectedGenre)) {
                    setFilter({ ...filters, genres: [...filters.genres, selectedGenre] });
                }}
                }>

                <option value="" disabled>Select Genre</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
            </select>
            </div>
            <div className="activegenres">
                {filters.genres.length > 0 ? (
                    filters.genres.map(genre => (
                        <button className="activegenrebutton" key={genre} onClick={() => removeGenre(genre)}>{idToGenre[genre]} X</button>
                    ))
                ) : (
                    null
                )
                }
            </div>
        </div>
    );
};

export default MovieFilters;