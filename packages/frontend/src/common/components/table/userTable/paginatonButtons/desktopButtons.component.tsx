import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { StyledButtonContainer, StyledPCButton } from './paginationButtons.styled';
import { Pagination } from '../../../../types/pagination.type';
import { PAGINATION_KEYS } from '../../../../consts/pagination.consts';

interface DesktopButtonsProps {
  paginationProps: Pagination;
  todoItemsLength: number;
}

export const DesktopButtons: React.FC<DesktopButtonsProps> = ({
  paginationProps,
  todoItemsLength
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paginationProps.total / PAGINATION_KEYS.DESKTOP_PAGE_SIZE);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }
  const handlePcClick = (pageNumber: number) => {
    paginationProps.setSkip((pageNumber - 1) * PAGINATION_KEYS.DESKTOP_PAGE_SIZE);
    paginationProps.setTake(pageNumber * PAGINATION_KEYS.DESKTOP_PAGE_SIZE);
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePcClick(totalPages);
    }
  }, [totalPages]);

  return (
    <Box>
      {todoItemsLength > 0 && (
        <StyledButtonContainer>
          {pageNumbers.map((pageNumber) => (
            <StyledPCButton
              key={pageNumber}
              onClick={() => handlePcClick(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </StyledPCButton>
          ))}
        </StyledButtonContainer>
      )}
    </Box>
  );
};
