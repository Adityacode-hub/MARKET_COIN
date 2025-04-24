import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleTheme, selectTheme } from '../store/themeSlice';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  
  &:focus {
    outline: none;
  }
`;

const Sun = styled.span`
  color: #f1c40f;
  font-size: 1.2rem;
  line-height: 1rem;
`;

const Moon = styled.span`
  color: #f1c40f;
  font-size: 1.2rem;
  line-height: 1rem;
`;

const ToggleThumb = styled.span`
  position: absolute;
  top: 0.2rem;
  left: ${({ isDark }) => isDark ? '2.2rem' : '0.2rem'};
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s linear;
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isDark = theme === 'dark';
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <ToggleContainer onClick={handleToggle}>
      <Sun>☀</Sun>
      <Moon>☾</Moon>
      <ToggleThumb isDark={isDark} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
