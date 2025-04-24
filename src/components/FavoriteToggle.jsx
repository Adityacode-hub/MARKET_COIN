import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleFavorite, selectIsCryptoFavorite } from '../store/cryptoSlice';

const StarButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, isFavorite }) => isFavorite ? theme.colors.warning : theme.colors.text.secondary};
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const FavoriteToggle = ({ cryptoId }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => selectIsCryptoFavorite(state, cryptoId));
  
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent row click event
    dispatch(toggleFavorite(cryptoId));
  };
  
  return (
    <StarButton 
      onClick={handleToggleFavorite}
      isFavorite={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '★' : '☆'}
    </StarButton>
  );
};

export default FavoriteToggle;
