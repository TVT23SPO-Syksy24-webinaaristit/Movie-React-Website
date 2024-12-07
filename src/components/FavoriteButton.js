import React, { useState } from 'react';

const FavoriteButton = ({ isFavorite, onToggleFavorite }) => {
  return (
    <button onClick={onToggleFavorite} className={`favorite-button ${isFavorite ? 'active' : ''}`}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoriteButton;
  
  