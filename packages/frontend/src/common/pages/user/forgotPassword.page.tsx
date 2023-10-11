import React from 'react';
import { Typography } from '@mui/material';
import ForgotPasswordForm from '../../components/form/userForm/forgotPasswordForm.component';
import { IUserEmail } from '../../types/user.type';
import { useForgotPasswordMutation } from '../../../hooks/user.hooks';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import { IResponceError } from '../../types/responce.type';
import Loader from '../../utils/loader.styled';
import { ILoadStatus } from '../../types/loadingStatuses.type';
import { BaseModal } from '../../components/modal';

export const ForgotPasswordPage: React.FC = () => {
  const { status, mutate, error } = useForgotPasswordMutation();
  const [isOpen, setIsOpen] = React.useState(false);
  const errorData = error as IResponceError;
  const handleSubmit = async (user: IUserEmail) => {
    await mutate(user);
    if (status === ILoadStatus.Success) {
      setIsOpen(true);
    }
  };

  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        {status === ILoadStatus.Loading && <Loader />}
        <Typography variant="h5">Forgot password</Typography>
        <Typography>
          Enter the email that you specified during registration. You will receive a letter with
          further instructions
        </Typography>
        {status === ILoadStatus.Error && (
          <Typography color="error">{errorData.response.data.message}</Typography>
        )}
        <ForgotPasswordForm onSubmit={handleSubmit} />
      </StyledFormBox>
      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Success">
        <Typography>Email sent</Typography>
      </BaseModal>
    </StyledAuthPageBox>
  );
};
