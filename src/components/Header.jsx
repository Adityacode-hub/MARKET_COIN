import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleTheme, selectTheme } from '../store/themeSlice';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 15px 0;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.span`
  font-size: 28px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>Ì≥à</LogoIcon>
          MARKET COIN
        </Logo>
        
        <Controls>
          <ThemeToggle 
            onClick={handleToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? 'Ìºô' : '‚òÄÔ∏è'}
          </ThemeToggle>
        </Controls>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
