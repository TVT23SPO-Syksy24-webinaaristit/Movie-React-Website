import axios from "axios"
import React, { createContext, useContext } from 'react';
import { UserContext } from "./UserContext";

const url = process.env.REACT_APP_API_URL;

const FavoriteContext = createContext (); 

export function useFavorites() {
    const context = useContext(FavoriteContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoriteProvider');
    }
    return context;
  }

  export const FavoriteProvider = ({children}  ) => {
    const {User} = useContext(UserContext); 
  
const addToFavorites = async(idmovie) => {
    const headers = { Authorization: user.token, 
        'x-movie-id': idmovie,
    };

   
    axios.post(url + "/api/favorites/insertfavorites", { movieId: movie.id }, headers) // Example API call
      .then(response => {
        addToFavorites([...favorites, movie]) 
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }

  const removeFromFavorites = (movieId) => {
    const headers = { headers: { Authorization: user.token } }

    
    axios.delete(url + "/favorites/remove/" + movieId, headers) 
      .then(response => {
        setFavorites(favorites.filter(movie => movie.id !== movieId)) 
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }
    return(
        <FavoriteContext.Provider value = {{addToFavorites, removeFromFavorites}}>
        {children}
        </FavoriteContext.Provider>
        )

}

