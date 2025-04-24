import React from 'react';
import styled from 'styled-components';

const DebugContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
  max-width: 400px;
  max-height: 300px;
  overflow: auto;
`;

const Debug = ({ data }) => {
  return (
    <DebugContainer>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </DebugContainer>
  );
};

export default Debug;
