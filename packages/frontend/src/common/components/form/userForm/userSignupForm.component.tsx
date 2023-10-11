import React from 'react';
import { Formik, Field, Form, FormikValues } from 'formik';
import { Box, Button } from '@mui/material';
import { signupInitialValues, validateSignUpForm } from '../../../utils/validation.util';
import { IUserSignup } from '../../../types/user.type';
import { StyledFormContainer, StyledErrorMesssage, StyledInputContainer } from '../form.styled';
import { StyledButtonContainer } from '../../table/userTable/paginatonButtons/paginationButtons.styled';

interface SignupFormProps {
  onSubmit: (user: IUserSignup) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: FormikValues) => {
    const { username, email, password, repeatPassword, name, idCard, group, phone, faculty } =
      values;
    const user: IUserSignup = {
      username: username || '',
      email: email || '',
      password: password || '',
      repeatPassword: repeatPassword || '',
      name: name || '',
      idCard: idCard || '',
      group: group || '',
      phone: phone || '',
      faculty: faculty || ''
    };
    onSubmit(user);
  };
  return (
    <StyledFormContainer>
      <Formik
        initialValues={signupInitialValues}
        onSubmit={handleSubmit}
        validate={validateSignUpForm}
      >
        <Form>
          <StyledInputContainer>
            <Box>Username</Box>
            <Field type="text" id="username" name="username" placeholder="Username" />
            <StyledErrorMesssage name="username" component="div" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Email</Box>
            <Field type="email" id="email" name="email" placeholder="example@example.com" />
            <StyledErrorMesssage name="email" component="div" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Name:</Box>
            <Field type="text" id="name" name="name" placeholder="Шевченко Тарас Григорович" />
            <StyledErrorMesssage name="name" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>ID card:</Box>
            <Field type="text" id="idCard" name="idCard" placeholder="123456789" />
            <StyledErrorMesssage name="idCard" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Group:</Box>
            <Field type="text" id="group" name="group" placeholder="ІП-02" />
            <StyledErrorMesssage name="group" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Phone:</Box>
            <Field type="text" id="phone" name="phone" placeholder="+380501234567" />
            <StyledErrorMesssage name="phone" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Faculty:</Box>
            <Field type="text" id="faculty" name="faculty" placeholder="ФІОТ" />
            <StyledErrorMesssage name="faculty" component="div" className="error" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Password</Box>
            <Field type="password" id="password" name="password" placeholder="password" />
            <StyledErrorMesssage name="password" component="div" />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Repeat password</Box>
            <Field
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="password"
            />
            <StyledErrorMesssage name="repeatPassword" component="div" />
          </StyledInputContainer>

          <StyledButtonContainer>
            <Button type="submit" variant="contained" color="info">
              Signup
            </Button>
          </StyledButtonContainer>
        </Form>
      </Formik>
    </StyledFormContainer>
  );
};

export default SignupForm;
