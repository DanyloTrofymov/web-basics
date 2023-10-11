import React from 'react'
import type {
  FormikValues,
} from 'formik'
import {
  Formik, Form, Field,
} from 'formik'
import {
  Box, Button,
} from '@mui/material'
import {
  StyledFormContainer, StyledErrorMesssage, StyledInputContainer,
} from '../form.styled'
import {
  StyledButtonContainer,
} from '../../table/userTable/paginatonButtons/paginationButtons.styled'
import {
  restorePasswordInitialValues,
  validateRestorePasswordForm,
} from '../../../utils/validation.util'
import type {
  IUserRestorePassword,
} from '../../../types/user.type'

interface UserEditFormProps {
  token?: string;
  onSubmit: (newUser: IUserRestorePassword) => void;
}

export const RestorePasswordForm: React.FC<UserEditFormProps> = ({
  token, onSubmit,
},) => {
  if (token === undefined) {
    return <Box>No token found</Box>
  }
  const handleSubmit = (values: FormikValues,) => {
    const {
      password, repeatPassword,
    } = values
    const newUser = {
      token,
      password: password || '',
      repeatPassword: repeatPassword || '',
    }
    onSubmit(newUser,)
  }

  return (
    <StyledFormContainer>
      <Formik
        initialValues={restorePasswordInitialValues}
        onSubmit={handleSubmit}
        validate={validateRestorePasswordForm}
      >
        <Form>
          <StyledInputContainer>
            <Box>New password:</Box>
            <Field type='password' id='password' name='password' />
            <StyledErrorMesssage name='password' component='div' className='error' />
          </StyledInputContainer>

          <StyledInputContainer>
            <Box>Repeat password:</Box>
            <Field type='password' id='repeatPassword' name='repeatPassword' />
            <StyledErrorMesssage name='repeatPassword' component='div' className='error' />
          </StyledInputContainer>

          <StyledButtonContainer>
            <Button type='submit' variant='contained' color='info'>
              Change password
            </Button>
          </StyledButtonContainer>
        </Form>
      </Formik>
    </StyledFormContainer>
  )
}
