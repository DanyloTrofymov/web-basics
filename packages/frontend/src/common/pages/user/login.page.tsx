import React from 'react';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/form/userForm/userLoginForm.component';
import { IUserLogin } from '../../types/user.type';
import { useLoginMutation } from '../../../hooks/user.hooks';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import { IResponceError } from '../../types/responce.type';
import Loader from '../../utils/loader.styled';
import { ILoadStatus } from '../../types/loadingStatuses.type';
import { ROUTER_KEYS } from '../../consts/app-keys.const';

export const LoginPage: React.FC = () => {
  const { status, mutate, error } = useLoginMutation();
  const history = useHistory();

  const handleSubmit = async (user: IUserLogin) => {
    mutate(user);
  };
  if (status === ILoadStatus.Success) {
    history.push(ROUTER_KEYS.ROOT);
  }
  const handleClick = () => {
    history.push(ROUTER_KEYS.FORGOT_PASSWORD);
  };
  const errorData = error as IResponceError;
  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        {status === ILoadStatus.Loading && <Loader />}
        <Typography variant="h5">Login</Typography>
        {status === ILoadStatus.Error && (
          <Typography color="error">{errorData.response.data.message}</Typography>
        )}
        <LoginForm onSubmit={handleSubmit} />
        <Typography
          variant="body2"
          color="primary"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          sx={{ mt: 2 }}
          onClick={handleClick}
        >
          Forgot password?
        </Typography>
      </StyledFormBox>
    </StyledAuthPageBox>
  );
};
