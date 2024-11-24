import React from "react";
import ReactPaginate from "react-paginate";
import { useFilters } from "../contexts/useFilters";
import "./MoviePagination.css"

const MoviePagination = () => {

    const {totalPages, setPage, page} = useFilters();

    return (
    <div className="moviepagination">
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => setPage(e.selected+1)}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={page-1}
        />
    </div>
    )
}

export default MoviePagination;