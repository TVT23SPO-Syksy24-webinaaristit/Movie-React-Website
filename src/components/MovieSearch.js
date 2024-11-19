import React from "react";
import { useFilters } from "../contexts/useFilters";

const MovieSearch = () => {
    const {filters, setFilter} = useFilters()

    return(
    <div className="MovieSearch">
        <button>🏷</button>
        <input 
        value={filters.search} 
        onChange={(event) => setFilter({...filters, search: event.target.value})} 
        type="text" className="moviesearchfield" placeholder="search..."/>
    </div>
    );
};

export default MovieSearch;