import axios from 'axios';
import React, { createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContext";


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

  const addToFavorites = async (idmovie, title, posterUrl,  ) => {
    

    if (!user || !user.id) {
      throw new Error("User is not logged in or user ID is missing.");
    }
    const headers = {Authorization: user.token};
    try {
      
      const data = {
        idmovie: idmovie,
        title: title,
        accounts_idaccount: user.id,
        poster_url: posterUrl,


      };
      console.log(data)

      
      
      // console.log(accounts_idaccount)
      // data.accounts_idaccount = parseInt(accounts_idaccount);
      // console.log(accounts_idaccount)
      // console.log(`${API_URL}/favorites/postfavorites`)
      const response = await axios.post(`${API_URL}/favorites/postfavorites`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error adding favorites:", error.response.data.error);
      throw error;
    }
  };

  const getFavorites = async (idmovie, title, posterUrl, idfavorite) => {
    const headers = {Authorization: user.token};
    try {

      const data = {
        idmovie: idmovie,
        title: title,
        accounts_idaccount: user.id,
        poster_url: posterUrl,
        idfavorite: idfavorite
      };
      

      const response = await axios.get(`${API_URL}/favorites/postfavorites`, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      alert('An error occurred while fetching your favorites. Please try again later.');
    }
  };

  // const removeFromFavorites = (idmovie) => {
  //   const headers = { headers: { Authorization: user.token } }

    
  //   axios.delete(url + "/favorites/remove/" + idmovie, headers) 
  //     .then(response => {
  //       setFavorites(favorites.filter(movie => movie.id !== movieId)) 
  //     })
  //     .catch(error => {
  //       alert(error.response.data.error ? error.response.data.error : error)
  //     })
  // }
  return (
    <FavoriteContext.Provider value={{ addToFavorites, getFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};


