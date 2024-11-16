import { useContext } from "react";
import { MovieFilterContext } from "./MovieFilterContext";

export const useFilters = () => {
    return useContext(MovieFilterContext)
}