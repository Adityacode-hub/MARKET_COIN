import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchTerm, selectSearchTerm } from '../store/cryptoSlice';

const SearchContainer = styled.div`
  position: relative;
  width: 350px;
  max-width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  display: ${({ visible }) => visible ? 'block' : 'none'};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SearchResultCount = styled.div`
  position: absolute;
  right: 10px;
  top: calc(100% + 5px);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredCount = useSelector(state => state.crypto.data.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).length);
  const totalCount = useSelector(state => state.crypto.data.length);
  
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };
  
  return (
    <SearchContainer>
      <SearchIcon>Ì¥ç</SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search by name or symbol..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search cryptocurrencies"
      />
      <ClearButton 
        onClick={handleClearSearch}
        visible={searchTerm.length > 0}
        aria-label="Clear search"
      >
        ‚úï
      </ClearButton>
      {searchTerm && (
        <SearchResultCount>
          Found {filteredCount} of {totalCount} cryptocurrencies
        </SearchResultCount>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
