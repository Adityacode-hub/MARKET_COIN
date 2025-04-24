import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectFilteredAndSortedCryptos } from '../store/cryptoSlice';
import { exportAsCSV, exportAsJSON } from '../utils/exportUtils';

const ExportButtonContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  z-index: 10;
  min-width: 120px;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ExportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cryptoData = useSelector(selectFilteredAndSortedCryptos);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleExportCSV = () => {
    exportAsCSV(cryptoData);
    setIsOpen(false);
  };
  
  const handleExportJSON = () => {
    exportAsJSON(cryptoData);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <ExportButtonContainer onClick={(e) => e.stopPropagation()}>
      <Button onClick={toggleDropdown}>
        Export Data
      </Button>
      <DropdownMenu isOpen={isOpen}>
        <MenuItem onClick={handleExportCSV}>
          Export as CSV
        </MenuItem>
        <MenuItem onClick={handleExportJSON}>
          Export as JSON
        </MenuItem>
      </DropdownMenu>
    </ExportButtonContainer>
  );
};

export default ExportButton;
