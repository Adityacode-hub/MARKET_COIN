import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  selectPagination, 
  selectTotalPages, 
  setCurrentPage, 
  setItemsPerPage 
} from '../store/cryptoSlice';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

const PageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PageButton = styled.button`
  background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text.primary};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  padding: 5px 10px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PageSizeSelector = styled.select`
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(selectPagination);
  const totalPages = useSelector(selectTotalPages);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };
  
  const handleItemsPerPageChange = (e) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
  };
  
  // Generate page buttons
  const renderPageButtons = () => {
    const buttons = [];
    
    // Always show first page
    buttons.push(
      <PageButton
        key="first"
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </PageButton>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      buttons.push(
        <span key="ellipsis1">...</span>
      );
    }
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      
      buttons.push(
        <PageButton
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2">...</span>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <PageButton
          key="last"
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }
    
    return buttons;
  };
  
  return (
    <PaginationContainer>
      <PageInfo>
        Showing {itemsPerPage} items per page, page {currentPage} of {totalPages}
      </PageInfo>
      
      <PageControls>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        
        {renderPageButtons()}
        
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
        
        <PageSizeSelector
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </PageSizeSelector>
      </PageControls>
    </PaginationContainer>
  );
};

export default Pagination;
