import React from 'react';
import { StyledTableCell, StyledTableRow } from './userTableElement.styled';
import { IUser } from '../../../types/user.type';

interface RowProps {
  user: IUser;
  onView: () => void;
}

export const UserTableElement: React.FC<RowProps> = ({ user, onView }) => (
  <StyledTableRow onClick={onView}>
    <StyledTableCell>{user.name}</StyledTableCell>
    <StyledTableCell>{user.faculty}</StyledTableCell>
    <StyledTableCell>{user.group}</StyledTableCell>
  </StyledTableRow>
);
