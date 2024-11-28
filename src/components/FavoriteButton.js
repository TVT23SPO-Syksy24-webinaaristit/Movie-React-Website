import React, { useState } from 'react';

function FavoriteButton({ isFavorite, onToggleFavorite }) {
    const button = document.createElement('button');
    button.textContent = isFavorite ? 'Unfavorite' : 'Favorite';
    button.classList.add('favorite-button');
    if (isFavorite) {
      button.classList.add('active');
    }
  
    button.addEventListener('click', onToggleFavorite);
  
    return button;
  }
  
  export default FavoriteButton;