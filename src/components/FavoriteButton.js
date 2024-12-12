import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";

const FavoriteButton = ({ idmovie, title, posterUrl, isFavorited, onFavoriteAdded }) => {
  const { user } = useUser();
  const { addToFavorites } = useFavorites();
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleNewFavorite = async () => {
    if (!user || !user.id) {
      setError("User is not logged in or user ID is missing.");
      console.error("User or user ID is undefined:", user);
      return;
    }

    try {
      const response = await addToFavorites(idmovie, title, posterUrl);
      if (!response) {
        setError("Failed to add favorites.");
      } else {
        console.log("Favorite added successfully:", response);
        setIsFavorite(true); // Update the state to reflect the new favorite status
        setError(null); // Clear error on success
        if (onFavoriteAdded) {
          onFavoriteAdded(); // Call the callback to fetch favorites again
        }
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError("Failed adding favorites. Please try again later.");
    }
  };

  if (isFavorite) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleNewFavorite}
        className={`favorite-button ${isFavorite ? "active" : ""}`}
      >
        Favorite
      </button>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default FavoriteButton;