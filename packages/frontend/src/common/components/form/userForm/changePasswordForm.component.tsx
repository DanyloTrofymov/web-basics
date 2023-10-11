import React from 'react';
import type { FormikValues } from 'formik';
import { Formik, Form, Field } from 'formik';
import { Box, Button } from '@mui/material';
import { StyledFormContainer, StyledErrorMesssage, StyledInputContainer } from '../form.styled';
import { StyledButtonContainer } from '../../table/userTable/paginatonButtons/paginationButtons.styled';
import { validatePasswordChangeForm } from '../../../utils/validation.util';
import type { IUser, IUserChangePassword } from '../../../types/user.type';

interface UserEditFormProps {
  user?: IUser;
  onClose: () => void;
  onSubmit: (newUser: IUserChangePassword) => void;
}

export const ChangePasswordForm: React.FC<UserEditFormProps> = ({ user, onClose, onSubmit }) => {
  const initialValues = {
    oldPassword: '',
    password: '',
    repeatPassword: ''
  };
  const handleSubmit = (values: FormikValues) => {
    const { oldPassword, password, repeatPassword } = values;
    const newUser = {
      id: user?.id || '',
      oldPassword: oldPassword || '',
      password: password || '',
      repeatPassword: repeatPassword || ''
    };
    onSubmit(newUser);
  };

  return (
    <StyledFormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validatePasswordChangeForm}
      >
        <Form>
          <StyledInputContainer>
            <Box>Old password:</Box>
            <Field type="password" id="oldPassword" name="oldPassword" />
            <StyledErrorMesssage name="oldPassword" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>New password:</Box>
            <Field type="password" id="password" name="password" />
            <StyledErrorMesssage name="password" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Repeat password:</Box>
            <Field type="password" id="repeatPassword" name="repeatPassword" />
            <StyledErrorMesssage name="repeatPassword" component="div" className="error" />
          </StyledInputContainer>

          <StyledButtonContainer>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={onClose}
              sx={{
                mr: 'auto'
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="info">
              Change password
            </Button>
          </StyledButtonContainer>
        </Form>
      </Formik>
    </StyledFormContainer>
  );
};
