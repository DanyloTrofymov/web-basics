import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { BaseModal } from '../baseModal/baseModal.component';
import { IUser } from '../../../types/user.type';
import Loader from '../../../utils/loader.styled';
import { ROUTER_KEYS } from '../../../consts/app-keys.const';
import { useLogout } from '../../../../hooks/user.hooks';

interface IProfileModalProps {
  isOpen: boolean;
  user: IUser | undefined;
  isCurrentUser: boolean;
  onClose: () => void;
  handleEdit: () => void;
}

export const ProfileViewModal: React.FC<IProfileModalProps> = ({
  isOpen,
  user,
  isCurrentUser,
  onClose,
  handleEdit
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const logout = useLogout();

  if (isOpen === false || typeof user === 'undefined') {
    return null;
  }

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    logout();
    history.push(ROUTER_KEYS.LOGIN);
    setIsLoading(false);
    onClose();
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="View"
      buttons={
        <>
          <Button onClick={handleEdit} variant="contained" color="info">
            Edit
          </Button>
          {isCurrentUser && (
            <Button onClick={handleLogout} variant="contained" color="error">
              Logout
            </Button>
          )}
        </>
      }
    >
      {isLoading && <Loader />}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Username
      </Typography>
      <Box sx={{ mb: 2 }}>{user.username}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Email
      </Typography>
      <Box sx={{ mb: 2 }}>{user.email}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Name
      </Typography>
      <Box sx={{ mb: 2 }}>{user.name}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Phone
      </Typography>
      <Box sx={{ mb: 2 }}>{user.phone}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        ID card
      </Typography>
      <Box sx={{ mb: 2 }}>{user.idCard}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Faculty
      </Typography>
      <Box sx={{ mb: 2 }}>{user.faculty}</Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Group
      </Typography>
      <Box sx={{ mb: 2 }}>{user.group}</Box>
    </BaseModal>
  );
};
