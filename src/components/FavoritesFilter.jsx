import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleShowOnlyFavorites } from '../store/cryptoSlice';

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text.primary};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, active }) => active ? 'white' : theme.colors.primary};
  }
`;

const StarIcon = styled.span`
  font-size: 18px;
  color: ${({ active, theme }) => active ? 'white' : theme.colors.warning};
`;

const FavoritesFilter = () => {
  const dispatch = useDispatch();
  const showOnlyFavorites = useSelector(state => state.crypto.showOnlyFavorites);
  const favoritesCount = useSelector(state => state.crypto.favorites.length);
  
  const handleToggleFilter = () => {
    dispatch(toggleShowOnlyFavorites());
  };
  
  return (
    <FilterButton 
      onClick={handleToggleFilter}
      active={showOnlyFavorites}
      aria-pressed={showOnlyFavorites}
    >
      <StarIcon active={showOnlyFavorites}>⭐</StarIcon>
      {showOnlyFavorites ? 'Show All' : `Favorites (${favoritesCount})`}
    </FilterButton>
  );
};

export default FavoritesFilter;
