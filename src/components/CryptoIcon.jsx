import React, { useState } from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const CryptoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FallbackIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, symbol }) => {
    // Generate a deterministic color based on the symbol
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }};
  color: white;
  font-weight: bold;
  font-size: ${props => parseInt(props.size || '24', 10) * 0.5}px;
`;

const CryptoIcon = ({ symbol, size = '24px', name }) => {
  const [imageError, setImageError] = useState(false);
  
  // Try to load from multiple sources
  const iconUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  const fallbackUrl = `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`;
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <IconContainer size={size}>
      {!imageError ? (
        <CryptoImage 
          src={iconUrl} 
          alt={`${name || symbol} icon`}
          onError={handleImageError}
        />
      ) : (
        <FallbackIcon symbol={symbol} size={size}>
          {symbol.charAt(0)}
        </FallbackIcon>
      )}
    </IconContainer>
  );
};

export default CryptoIcon;
