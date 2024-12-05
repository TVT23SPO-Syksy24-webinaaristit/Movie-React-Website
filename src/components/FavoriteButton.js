import React, { useState } from 'react';

const FavoriteButton = ({ idmovie, isFavorited, onToggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      onToggleFavorite(idmovie);
      alert('Movie added to favorites successfully!'); // Show notification
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('An error occurred. Please try again later.');
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