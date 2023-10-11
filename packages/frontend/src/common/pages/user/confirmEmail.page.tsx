import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useConfirmEmailMutation } from '../../../hooks/user.hooks';
import { StyledFormBox, StyledAuthPageBox } from '../page.styled';
import Loader from '../../utils/loader.styled';
import { ILoadStatus } from '../../types/loadingStatuses.type';

export const ConfirmEmailPage: React.FC = () => {
  const { status, mutate } = useConfirmEmailMutation();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const handleSubmit = async () => {
    mutate(token);
  };
  if (status === ILoadStatus.Success) {
    history.push('/login');
  }
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <StyledAuthPageBox>
      <StyledFormBox>
        <Typography variant="h5">Email confirmation</Typography>
        {status === ILoadStatus.Error ? (
          <Typography>Error sending email</Typography>
        ) : (
          <Box>
            <Typography>Confirmation completed. You will be redirected to login...</Typography>
            <Loader />
          </Box>
        )}
      </StyledFormBox>
    </StyledAuthPageBox>
  );
};
