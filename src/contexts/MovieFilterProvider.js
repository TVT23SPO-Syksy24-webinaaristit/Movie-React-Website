import { useState } from "react";
import { MovieFilterContext } from "./MovieFilterContext"

export default function MovieFilterProvider({children}) {
    const [filters, setFilter] = useState({
        search: "",
        sortBy: "popularity.desc",
        genres: [],
        year: 2023,
        page: 1, 
        showFilters: true
    });

    return (
        <MovieFilterContext.Provider value={{filters,setFilter}}>
            {children}
        </MovieFilterContext.Provider>
    );
};
