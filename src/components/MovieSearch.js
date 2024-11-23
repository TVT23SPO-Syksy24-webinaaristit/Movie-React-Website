import React from "react";
import { useFilters } from "../contexts/useFilters";

const MovieSearch = () => {
    const {search, setSearch, setSearchToggle} = useFilters()

    return(
    <div className="MovieSearch">
        <h3>Search</h3>
        <button onClick={() => setSearchToggle(false)}>Switch to Discover</button>
        <input 
        value={search} 
        onChange={(event) => setSearch(event.target.value)} 
        type="text" className="moviesearchfield" placeholder="search for movies..."/>
    </div>
    );
};

export default MovieSearch;