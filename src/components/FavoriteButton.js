import React, { useState } from 'react';
import axios from 'axios';

const FavoriteButton = ({ movieId, isFavorite, onToggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/profile', { movieId });
      onToggleFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleToggle}
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
    >
      {isLoading ? 'Loading...' : (isFavorite ? 'Unfavorite' : 'Favorite')}
    </button>
  );
};

export default FavoriteButton;
  
  