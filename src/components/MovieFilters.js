import React from "react";
import { useFilters } from "../contexts/useFilters";

const MovieFilters = () => {
    const {filters, setFilter} = useFilters();

    return(
        <div className="MovieFilters">
            <h1>MovieFilters</h1>
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
            <select name="genre">
                <option value="" select disabled>Select Genre</option>
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
    );
};

export default MovieFilters;