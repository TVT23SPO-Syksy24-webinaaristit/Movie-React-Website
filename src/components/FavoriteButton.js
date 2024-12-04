import React, { useState } from 'react';

const FavoriteButton = ({ movieId, isFavorited, onToggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // Make API call to toggle favorite status
      onToggleFavorite(movieId);
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
      className={`favorite-button ${isFavorited ? 'active' : ''}`}
    >
      {isLoading ? 'Loading...' : (isFavorited ? 'Unfavorite' : 'Favorite')}
    </button>
  );
};

export default FavoriteButton;
  