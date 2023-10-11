import React from 'react';
import {
  StyledButtonContainer,
  StyledLeftArrow,
  StyledRightArrow
} from './paginationButtons.styled';
import { Pagination } from '../../../../types/pagination.type';
import { PAGINATION_KEYS } from '../../../../consts/pagination.consts';

interface TabletButtonsProps {
  paginationProps: Pagination;
  todoItemsLength: number;
  currentIndex: number;
  prevTodo: () => void;
  nextTodo: () => void;
}

export const TabletButtons: React.FC<TabletButtonsProps> = ({
  paginationProps,
  todoItemsLength,
  currentIndex,
  prevTodo,
  nextTodo
}) => {
  const handleTabletClick = () => {
    if (currentIndex === todoItemsLength - 3 && todoItemsLength < paginationProps.take) {
      paginationProps.setTake(paginationProps.take + PAGINATION_KEYS.TABLET_PAGE_SIZE);
    }
    nextTodo();
  };
  return (
    <StyledButtonContainer>
      <StyledLeftArrow onClick={prevTodo} disabled={currentIndex === 0}>
        &#x27A1;
      </StyledLeftArrow>
      <StyledRightArrow
        onClick={() => handleTabletClick()}
        disabled={currentIndex === todoItemsLength - 1}
      >
        &#x27A1;
      </StyledRightArrow>
    </StyledButtonContainer>
  );
};
