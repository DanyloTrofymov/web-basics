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
	validateUserEditForm,
} from '../../../utils/validation.util'
import type {
	IUser, IUserUpdate,
} from '../../../types/user.type'

interface IUserEditFormProps {
  user?: IUser;
  onClose: () => void;
  onSubmit: (newUser: IUserUpdate) => void;
  onDelete: () => void;
  onChangePassword: () => void;
}

export const EditUserForm: React.FC<IUserEditFormProps> = ({
	user,
	onClose,
	onSubmit,
	onChangePassword,
	onDelete,
},) => {
	const initialValues = {
		username: user?.username || '',
		email:    user?.email || '',
		name:     user?.name || '',
		idCard:   user?.idCard || '',
		group:    user?.group || '',
		phone:    user?.phone || '',
		faculty:  user?.faculty || '',
	}
	const handleSubmit = (values: FormikValues,): void => {
		const {
			username, email, name, idCard, group, phone, faculty,
		} = values
		const newUser = {
			id:       user?.id || '',
			username: username || '',
			email:    email || '',
			name:     name || '',
			idCard:   idCard || '',
			group:    group || '',
			phone:    phone || '',
			faculty:  faculty || '',
		}
		onSubmit(newUser,)
	}

	return (
		<StyledFormContainer>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateUserEditForm}>
				<Form>
					<StyledInputContainer>
						<Box>Username:</Box>
						<Field type='text' id='username' name='username' />
						<StyledErrorMesssage name='username' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Email:</Box>
						<Field type='text' id='email' name='email' />
						<StyledErrorMesssage name='email' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Name:</Box>
						<Field type='text' id='name' name='name' />
						<StyledErrorMesssage name='name' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Id card:</Box>
						<Field type='text' id='idCard' name='idCard' />
						<StyledErrorMesssage name='idCard' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Group:</Box>
						<Field type='text' id='group' name='group' />
						<StyledErrorMesssage name='group' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Phone:</Box>
						<Field type='text' id='phone' name='phone' />
						<StyledErrorMesssage name='phone' component='div' className='error' />
					</StyledInputContainer>

					<StyledInputContainer>
						<Box>Faculty:</Box>
						<Field type='text' id='faculty' name='faculty' />
						<StyledErrorMesssage name='faculty' component='div' className='error' />
					</StyledInputContainer>

					<StyledButtonContainer>
						<Box>
							<Button
								type='button'
								variant='outlined'
								color='error'
								onClick={onClose}
								sx={{
									mr: 'auto',
								}}
							>
                Cancel
							</Button>
							<Button variant='outlined' color='error' onClick={onDelete} sx={{
								mr: 2,
							}}>
                Delete profile
							</Button>
						</Box>
						<Box>
							<Button variant='outlined' color='info' onClick={onChangePassword}>
                Change password
							</Button>
							<Button type='submit' variant='contained' color='info' sx={{
								ml: 'auto',
							}}>
                Edit
							</Button>
						</Box>
					</StyledButtonContainer>
				</Form>
			</Formik>
		</StyledFormContainer>
	)
}
