import React from 'react';
import { Button, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { IUserRestorePassword } from '../../types/user.type';
import { RestorePasswordForm } from '../../components/form/userForm/restorePasswordForm.component';
import { useRestorePasswordMutation } from '../../../hooks/user.hooks';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import { IResponceError } from '../../types/responce.type';
import Loader from '../../utils/loader.styled';
import { ILoadStatus } from '../../types/loadingStatuses.type';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { BaseModal } from '../../components/modal';

export const RestorePasswordPage: React.FC = () => {
  const { status, mutate, error } = useRestorePasswordMutation();
  const errorData = error as IResponceError;
  const { token } = useParams<{ token: string }>();
  const [isOpen, setIsOpen] = React.useState(false);
  const history = useHistory();
  const handleSubmit = async (user: IUserRestorePassword) => {
    const data = { ...user, token };
    await mutate(data);
    setIsOpen(true);
  };
  const handleGoLogin = () => {
    history.push(ROUTER_KEYS.LOGIN);
  };

  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        {status === ILoadStatus.Loading && <Loader />}
        {status === ILoadStatus.Error && (
          <Typography color="error">{errorData.response.data.message}</Typography>
        )}
        <Typography variant="h5">Restore password</Typography>
        <RestorePasswordForm token={token} onSubmit={handleSubmit} />
      </StyledFormBox>
      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Success"
        buttons={
          <Button variant="contained" color="info" onClick={() => handleGoLogin()}>
            Go to login
          </Button>
        }
      >
        <Typography>Password changed</Typography>
      </BaseModal>
    </StyledAuthPageBox>
  );
};
