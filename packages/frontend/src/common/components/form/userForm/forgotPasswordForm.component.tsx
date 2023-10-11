import React from 'react'
import type {
  FormikValues,
} from 'formik'
import {
  Formik, Field, Form,
} from 'formik'
import {
  Button,
} from '@mui/material'
import {
  validateEmail,
} from '../../../utils/validation.util'
import type {
  IUserEmail,
} from '../../../types/user.type'
import {
  StyledFormContainer, StyledErrorMesssage, StyledInputContainer,
} from '../form.styled'
import {
  StyledButtonContainer,
} from '../../table/userTable/paginatonButtons/paginationButtons.styled'

interface ForgotPasswoedFormProps {
  onSubmit: (email: IUserEmail) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswoedFormProps> = ({
  onSubmit,
},) => {
  const initialValues = {
    email: '',
  }
  const handleSubmit = (values: FormikValues,) => {
    const {
      email,
    } = values
    const userMail: IUserEmail = {
      email: email || '',
    }
    onSubmit(userMail,)
  }
  return (
    <StyledFormContainer>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateEmail}>
        <Form>
          <StyledInputContainer>
            <Field type='email' id='email' name='email' placeholder='Enter your email' />
            <StyledErrorMesssage name='email' component='div' />
          </StyledInputContainer>
          <StyledButtonContainer>
            <Button type='submit' variant='contained' color='info'>
              Submit
            </Button>
          </StyledButtonContainer>
        </Form>
      </Formik>
    </StyledFormContainer>
  )
}
export default ForgotPasswordForm
