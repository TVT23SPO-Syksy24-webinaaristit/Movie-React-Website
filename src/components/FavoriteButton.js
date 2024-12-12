
import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoriteProvider";
import { useUser } from "../contexts/useUser";
import { getFavorites } from "../contexts/FavoriteProvider";

const FavoriteButton = ({ isFavorited, idmovie, title, posterUrl }) => {
  const { user } = useUser();
  const { addToFavorites } = useFavorites();
  const [error, setError] = useState(null);

  const handleNewFavorite = async () => {
    if (!user || !user.id) {
        setError("User is not logged in or user ID is missing.");
        console.error("User or user ID is undefined:", user);
        return;
    }

    console.log("ID Movie:", idmovie); // Log idmovie before calling API
    console.log("User ID:", user.id); // Log user ID
    console.log("title:", title);
    console.log("poster url:", posterUrl);

    try {
        const response = await addToFavorites(idmovie, title, posterUrl);
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

    useEffect(() => {
        const getFavorites = async () => {
          try {
          
          } catch (error) {
            console.error('Error fetching favorites:', error);
            alert('An error occurred while fetching your favorites. Please try again later.');
          }
        };
    
        getFavorites();
      }, []);

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
