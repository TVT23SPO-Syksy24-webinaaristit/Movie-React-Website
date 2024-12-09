
import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";

const FavoriteButton = ({ isFavorited, idmovie, idfavorite, title, accounts_idaccount }) => {
  const { user } = useUser();
  const { addToFavorites } = useFavorites();
  const [error, setError] = useState(null);

  const handleNewFavorite = async () => {
    if (!user || !user.id) {
      setError("User is not logged in or user ID is missing.");
      console.error("User or user ID is undefined:", user);
      return;
    }
  
    try {
      const response = await addToFavorites(idmovie, idfavorite, title, accounts_idaccount);
      if (!response) {
        setError("Failed to add favorites.");
      } else {
        console.log("Favorite added successfully:", response);
        setError(null); // Clear error on success
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError("Failed adding favorites. Please try again later.");
    }
  };

  return (
    <>
      <button
        onClick={handleNewFavorite}
        className={`favorite-button ${isFavorited ? "active" : ""}`}
      >
        Favorite
      </button>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default FavoriteButton;
