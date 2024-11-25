import { useState, useMemo } from "react";
import { MovieFilterContext } from "./MovieFilterContext"

export default function MovieFilterProvider({children}) {
    const [filters, setFilter] = useState({
        sortBy: "popularity.desc",
        genres: [],
        year: 2023,
    });
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [searchToggle, setSearchToggle] = useState(true);
    const [search, setSearch] = useState("");

    const contextVariables = useMemo(() => ({
        filters,
        setFilter,
        page, 
        setPage,
        totalPages, 
        setTotalPages,
        searchToggle,
        setSearchToggle,
        search,
        setSearch
    }), [filters, page, totalPages, searchToggle, search]);

    return (
        <MovieFilterContext.Provider value={contextVariables}>
            {children}
        </MovieFilterContext.Provider>
    );
};
