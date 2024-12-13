import React, { useState, useEffect } from "react";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";

const FavoriteButton = ({ refresh, setRefresh, idmovie, title, posterUrl, isFavorited, onFavoriteAdded }) => {
  const { getFavorites, addToFavorites } = useFavorites();
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !user.id) {
        setError("User is not logged in or user ID is missing.");
        console.error("User or user ID is undefined:", user);
        setLoading(false);
        return;
      }

      try {
        const favorites = await getFavorites();
        const isAlreadyFavorite = favorites.some((fav) => fav.idmovie === idmovie);
        setIsFavorite(isAlreadyFavorite);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [refresh, user, idmovie, getFavorites]);

  const handleAddNewFavorite = async () => {
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
        setRefresh((prev) => !prev); // Trigger a refresh
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError("Failed adding favorites. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isFavorite ? (
        <button className="favorite-button" disabled>
          ✅ Favorited
        </button>
      ) : (
        <button
          className="favorite-button"
          onClick={handleAddNewFavorite}
        >
          ➕ Add to Favorites
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FavoriteButton;