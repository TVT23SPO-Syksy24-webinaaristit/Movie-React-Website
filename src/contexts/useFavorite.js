import { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext";

export const useFavorite = () => {
    return useContext(FavoriteContext)
}