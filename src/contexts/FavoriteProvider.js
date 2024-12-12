import React, { createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const FavoriteContext = createContext();

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}

export const FavoriteProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const getFavorites = async () => {
    if (!user || !user.id) {
      throw new Error("User is not logged in or user ID is missing.");
    }
    const headers = { Authorization: user.token };
    try {
      const response = await axios.get(`${API_URL}favorites/getfavorites`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching favorites:", error.response?.data?.error || error.message);
      throw error;
    }
  };

  const addToFavorites = async (idmovie, title, posterUrl) => {
    if (!user || !user.id) {
      throw new Error("User is not logged in or user ID is missing.");
    }
    const headers = { Authorization: user.token };
    try {
      const data = {
        idmovie,
        title,
        accounts_idaccount: user.id,
        poster_url: posterUrl,
      };
      

      const response = await axios.get(`${API_URL}/favorites/getfavorites`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error adding favorites:", error.response?.data?.error || error.message);
      throw error;
    }
  };

  return (
    <FavoriteContext.Provider value={{ getFavorites, addToFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};