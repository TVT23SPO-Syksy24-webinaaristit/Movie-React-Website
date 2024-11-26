import React from "react";
import { useFilters } from "../contexts/useFilters";

const MovieSearch = () => {
    const {setPage, search, setSearch, setSearchToggle} = useFilters()

    return(
    <div className="MovieSearch">
        <div className="buttontitle">
            <h3>Search</h3>
            <button className="modeSwitch" onClick={() => {
                setPage(1);
                setSearchToggle(false);
            }}>Switch to Discover</button>
        </div>
        <input 
        value={search} 
        onChange={(event) => setSearch(event.target.value)} 
        type="text" className="moviesearchfield" placeholder="search for movies..."/>
    </div>
    );
};

export default MovieSearch;