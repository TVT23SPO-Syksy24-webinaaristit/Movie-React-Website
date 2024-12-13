import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";

const FavoriteButton = ({ idmovie, title, posterUrl, isFavorited, onFavoriteAdded }) => {
  const { addToFavorites, removeFromFavorites } = useFavorites();
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorited); // Local state for favorite status

  const handleAddNewFavorite = async () => {
    if (!user || !user.id) {
      setError("User is not logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await addToFavorites(idmovie, title, posterUrl);
      if (!response) {
        setError("Failed to add favorite.");
        console.error("Unexpected response from backend:", response);
      } else {
        console.log("Favorite added successfully:", response);
        setIsFavorite(true); // Update local favorite state
        setError(null); // Clear any errors
        if (onFavoriteAdded) onFavoriteAdded(); // Notify parent to refresh favorites
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError("Error adding to favorites. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const handleRemoveFromFavorites = async () => {
    if (!user || !user.id) {
      setError("User is not logged in.");
      return;
    }

    setLoading(true);
    try {
      const response = await removeFromFavorites(idmovie, title, posterUrl);
      if (!response) {
        setError("Failed to remove favorite.");
        console.error("Unexpected response from backend:", response);
      } else {
        console.log("Favorite removed successfully:", response);
        setIsFavorite(false); // Update local favorite state
        setError(null); // Clear any errors
        if (onFavoriteAdded) onFavoriteAdded(); // Notify parent to refresh favorites
      }
    }
    catch (err) {
      console.error("Error removing from favorites:", err);
      setError("Error removing from favorites. Please try again later.");
    }
    finally {
      setLoading(false); // Ensure loading state is reset
    }
  }

  if (loading) {
    return <button className="favorite-button" disabled>Loading...</button>;
  }

  return (
    <div>
      {isFavorite ? (
        <button className="favorite-button" onClick={handleRemoveFromFavorites}>
          ❌ Remove from Favorites
        </button>
      ) : (
        <button className="favorite-button" onClick={handleAddNewFavorite}>
          ➕ Add to Favorites
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FavoriteButton;
