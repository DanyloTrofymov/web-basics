import React from 'react';
import type { FormikValues } from 'formik';
import { Formik, Field, Form } from 'formik';
import { Box, Button } from '@mui/material';
import { loginInitialValues, validateLoginForm } from '../../../utils/validation.util';
import type { IUserLogin } from '../../../types/user.type';
import { StyledFormContainer, StyledErrorMesssage, StyledInputContainer } from '../form.styled';
import { StyledButtonContainer } from '../../table/userTable/paginatonButtons/paginationButtons.styled';

interface LoginFormProps {
  onSubmit: (user: IUserLogin) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: FormikValues) => {
    const { username, password } = values;
    const user: IUserLogin = {
      username: username || '',
      password: password || ''
    };
    onSubmit(user);
  };
  return (
    <StyledFormContainer>
      <Formik
        initialValues={loginInitialValues}
        onSubmit={handleSubmit}
        validate={validateLoginForm}
      >
        <Form>
          <StyledInputContainer>
            <Box>Username</Box>
            <Field type="text" id="username" name="username" placeholder="Enter your username" />
            <StyledErrorMesssage name="username" component="div" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Password</Box>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <StyledErrorMesssage name="password" component="div" />
          </StyledInputContainer>

          <StyledButtonContainer>
            <Button type="submit" variant="contained" color="info">
              Login
            </Button>
          </StyledButtonContainer>
        </Form>
      </Formik>
    </StyledFormContainer>
  );
};
export default LoginForm;
