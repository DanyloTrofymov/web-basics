import React from 'react';
import { Button, Switch } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './userTableElement.styled';
import { IUser } from '../../../types/user.type';

interface RowProps {
  user: IUser;
  onView: () => void;
  onDelete: () => void;
}

export const UserTableElement: React.FC<RowProps> = ({
  user,
  onView,
  onDelete
}) => {
  return (
    <StyledTableRow onClick={onView}>
      <StyledTableCell>
        {user.name}
      </StyledTableCell>
      <StyledTableCell>
        {user.faculty}
      </StyledTableCell>
      <StyledTableCell>
        {user.group}
      </StyledTableCell>
      <StyledTableCell>
        <Button
          style={{ margin: '10px' }}
          variant="outlined"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};
