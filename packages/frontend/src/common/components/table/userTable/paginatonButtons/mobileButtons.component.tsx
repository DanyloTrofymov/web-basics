import React from 'react'
import {
  StyledButtonContainer,
  StyledMobileButton,
  StyledTableButtonsRow,
} from './paginationButtons.styled'
import type {
  Pagination,
} from '../../../../types/pagination.type'
import {
  PAGINATION_KEYS,
} from '../../../../consts/pagination.consts'
import {
  StyledTableCell,
} from '../../userTableElement'

interface MobileButtonsProps {
  paginationProps: Pagination;

  todoItemsLength: number;
}

export const MobileButtons: React.FC<MobileButtonsProps> = ({
  paginationProps,
  todoItemsLength,
},) => {
  const handleMobileClick = () => {
    paginationProps.setTake(paginationProps.take + PAGINATION_KEYS.MOBILE_PAGE_SIZE,)
  }

  return (
    <StyledTableButtonsRow>
      {paginationProps.total !== todoItemsLength && (
        <StyledTableCell>
          <StyledButtonContainer>
            <StyledMobileButton onClick={() => {
              handleMobileClick()
            }}>Load more</StyledMobileButton>
          </StyledButtonContainer>
        </StyledTableCell>
      )}
    </StyledTableButtonsRow>
  )
}
