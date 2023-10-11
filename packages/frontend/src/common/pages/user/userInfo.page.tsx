import React from 'react';
import { Typography, Box } from '@mui/material';
import type { IUser } from '../../types/user.type';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';

interface IUserInfoProps {
  user: IUser;
}

export const UserInfoPage: React.FC<IUserInfoProps> = ({ user }) => (
  <StyledAuthPageBox>
    <StyledFormBox>
      <Typography variant="h4" sx={{ mb: 2 }}>
        User info
      </Typography>
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
    </StyledFormBox>
  </StyledAuthPageBox>
);
