import React, { useEffect, useRef, useState } from 'react';
import { Box, TableRow } from '@mui/material';
import { UserTableElement } from '../userTableElement';
import type { IUser } from '../../../types/user.type';
import { SortDirection } from '../../../types/user.type';
import {
  StyledTable,
  StyledTableBody,
  StyledTableHeadCell,
  StyledTableContainer,
  StyledBox
} from './userTable.styled';
import type { Pagination } from '../../../types/pagination.type';
import { MobileButtons, TabletButtons, DesktopButtons } from './paginatonButtons';
import SearchBar from '../../searchBar/searchbar.component';
import { PAGINATION_KEYS } from '../../../consts/pagination.consts';

interface ITableProps {
  userItems: Array<IUser>;
  paginationProps: Pagination;
  onView: (user: IUser) => void;
  onSearch: (query: string) => void;
}

export const UserTable: React.FC<ITableProps> = ({
  userItems,
  paginationProps,
  onView,
  onSearch
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [order, setOrder] = useState(SortDirection.Ascending);
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 425 && window.innerWidth <= 768) {
        setCurrentIndex(0);
        paginationProps.setSkip(0);
        paginationProps.setTake(PAGINATION_KEYS.TABLET_PAGE_SIZE);
      }
      if (window.innerWidth > 768) {
        paginationProps.setTake(PAGINATION_KEYS.DESKTOP_PAGE_SIZE);
      }
      if (window.innerWidth <= 425) {
        setCurrentIndex(0);
        paginationProps.setSkip(0);
        paginationProps.setTake(PAGINATION_KEYS.MOBILE_PAGE_SIZE);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const scrollCarousel = (scrollDirection: number): void => {
    const carouselElement = carouselRef.current;
    if (carouselElement !== null && !isScrolling) {
      setIsScrolling(true);
      setCurrentIndex(currentIndex + scrollDirection);
      const scrollAmount =
        scrollDirection * ((carouselElement.scrollWidth * 0.97) / userItems.length);
      carouselElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    }
  };

  const nextTodo = (): void => {
    if (currentIndex < userItems.length) {
      scrollCarousel(1);
    }
  };

  const prevTodo = (): void => {
    if (currentIndex > 0) {
      scrollCarousel(-1);
    }
  };

  const sortedTodoItems = [...userItems];
  sortedTodoItems.sort((a, b) => {
    if (sortCriteria === 'name') {
      return order === SortDirection.Ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortCriteria === 'faculty') {
      return order === SortDirection.Ascending
        ? a.faculty.localeCompare(b.faculty)
        : b.faculty.localeCompare(a.faculty);
    }
    if (sortCriteria === 'group') {
      return order === SortDirection.Ascending
        ? a.group.localeCompare(b.group)
        : b.group.localeCompare(a.group);
    }
    return 0;
  });

  const changeSortCriteria = (criteria: string): void => {
    setSortCriteria(criteria);
    setOrder(
      order === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending
    );
  };
  return (
    <StyledBox>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <SearchBar onSearch={onSearch} />
      </Box>
      <StyledTableContainer ref={carouselRef}>
        <StyledTable>
          <StyledTableBody>
            <TableRow>
              <StyledTableHeadCell
                onClick={(): void => {
                  changeSortCriteria('name');
                }}
              >
                Name &#8645;
              </StyledTableHeadCell>
              <StyledTableHeadCell
                onClick={(): void => {
                  changeSortCriteria('faculty');
                }}
              >
                Faculty &#8645;
              </StyledTableHeadCell>
              <StyledTableHeadCell
                onClick={(): void => {
                  changeSortCriteria('group');
                }}
              >
                Group &#8645;
              </StyledTableHeadCell>
            </TableRow>
            {sortedTodoItems.map((user, index) => (
              <UserTableElement key={index} user={user} onView={(): void => onView(user)} />
            ))}
            <MobileButtons paginationProps={paginationProps} todoItemsLength={userItems.length} />
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
      <TabletButtons
        paginationProps={paginationProps}
        todoItemsLength={userItems.length}
        currentIndex={currentIndex}
        nextTodo={nextTodo}
        prevTodo={prevTodo}
      />
      <DesktopButtons paginationProps={paginationProps} todoItemsLength={userItems.length} />
    </StyledBox>
  );
};
