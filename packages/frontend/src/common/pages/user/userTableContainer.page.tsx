import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledBox, UserTable } from '../../components/table/userTable';
import type { IUser, QueryFields } from '../../types/user.type';
import {
  BaseModal,
  ProfileDeleteModal,
  ProfileViewModal,
  ProfileEditModal
} from '../../components/modal';
import { useCountUsers, useAllUsers } from '../../../hooks/user.hooks';
import type { Pagination } from '../../types/pagination.type';
import { ILoadStatus } from '../../types/loadingStatuses.type';
import Loader from '../../utils/loader.styled';

export const UserTableContainer: React.FC = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(8);
  const query: QueryFields = {
    search,
    skip,
    take
  };
  const { status: usersStatus, data: users } = useAllUsers(query);
  const count = useCountUsers(query, users?.data);
  if (usersStatus === ILoadStatus.Loading || users?.data === undefined || count === undefined) {
    return (
      <StyledBox>
        <Loader />
      </StyledBox>
    );
  }
  if (usersStatus === ILoadStatus.Error) {
    return (
      <StyledBox>
        <Typography variant="h2">An server error has occurred. Try again later</Typography>
      </StyledBox>
    );
  }

  const paginationProps: Pagination = {
    total: count,
    skip,
    take,
    setSkip,
    setTake
  };

  const handleView = (user: IUser) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleEdit = () => {
    setIsViewOpen(false);
    setIsEditOpen(true);
  };
  return (
    <Box>
      <UserTable
        userItems={users.data}
        onView={handleView}
        onDelete={handleDelete}
        onSearch={setSearch}
        paginationProps={paginationProps}
      />
      <ProfileDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
        }}
        user={selectedUser}
        setErrorMessage={setErrorMessage}
      />
      <ProfileViewModal
        isOpen={isViewOpen}
        user={selectedUser}
        onClose={(): void => {
          setIsViewOpen(false);
        }}
        handleEdit={handleEdit}
      />
      <ProfileEditModal
        isOpen={isEditOpen}
        user={selectedUser}
        onClose={(): void => {
          setIsEditOpen(false);
        }}
        setErrorMessage={setErrorMessage}
        handleDelete={handleDelete}
        handleChangePassword={() => null}
      />
      <ProfileDeleteModal
        isOpen={isDeleteOpen}
        user={selectedUser}
        onClose={(): void => {
          setIsDeleteOpen(false);
        }}
        setErrorMessage={setErrorMessage}
      />
      <BaseModal
        isOpen={errorMessage !== ''}
        onClose={() => {
          setErrorMessage('');
        }}
        title="Error"
      >
        <p>{errorMessage}</p>
      </BaseModal>
    </Box>
  );
};
export default UserTableContainer;
