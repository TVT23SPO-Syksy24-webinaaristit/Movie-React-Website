import { useState, useMemo } from "react";
import { MovieFilterContext } from "./MovieFilterContext"

export default function MovieFilterProvider({children}) {
    const [filters, setFilter] = useState({
        sortBy: "popularity.desc",
        genres: [],
        year: 2023,
    });
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1
    });
    const [searchToggle, setSearchToggle] = useState(true);
    const [search, setSearch] = useState("");

    const contextVariables = useMemo(() => ({
        filters,
        setFilter,
        pagination,
        setPagination,
        searchToggle,
        setSearchToggle,
        search,
        setSearch
    }), [filters, pagination, searchToggle, search]);

    return (
        <MovieFilterContext.Provider value={contextVariables}>
            {children}
        </MovieFilterContext.Provider>
    );
};
