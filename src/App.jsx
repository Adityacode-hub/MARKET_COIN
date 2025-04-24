import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { selectTheme } from './store/themeSlice';
import { selectSelectedCryptoId } from './store/cryptoSlice';
import { getTheme } from './theme/themes';
import GlobalStyle from './theme/GlobalStyle';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FavoritesFilter from './components/FavoritesFilter';
import CryptoTable from './components/CryptoTable';
import Pagination from './components/Pagination';
import CryptoDetailView from './components/CryptoDetailView';
import WebSocketController from './components/WebSocketController';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

function App() {
  const theme = useSelector(selectTheme);
  const selectedCryptoId = useSelector(selectSelectedCryptoId);
  
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <GlobalStyle />
      <WebSocketController />
      <Header />
      <Container>
        {selectedCryptoId ? (
          <CryptoDetailView />
        ) : (
          <>
            <ControlsContainer>
              <SearchContainer>
                <SearchBar />
              </SearchContainer>
              <FilterContainer>
                <FavoritesFilter />
              </FilterContainer>
            </ControlsContainer>
            <CryptoTable />
            <Pagination />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
