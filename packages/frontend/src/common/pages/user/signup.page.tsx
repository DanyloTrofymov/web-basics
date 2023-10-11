import React, {
	useState,
} from 'react'
import {
	Typography, Button,
} from '@mui/material'
import {
	useHistory,
} from 'react-router-dom'
import SignupForm from '../../components/form/userForm/userSignupForm.component'
import type {
	IUserSignup,
} from '../../types/user.type'
import {
	useSignupMutation,
} from '../../../hooks/user.hooks'
import {
	StyledFormBox, StyledAuthPageBox,
} from '../page.styled'
import type {
	IResponceError,
} from '../../types/responce.type'
import Loader from '../../utils/loader.styled'
import {
	ILoadStatus,
} from '../../types/loadingStatuses.type'
import {
	BaseModal,
} from '../../components/modal'
import {
	ROUTER_KEYS,
} from '../../consts/app-keys.const'

export const SignupPage: React.FC = () => {
	const {
		status, mutate, error,
	} = useSignupMutation()
	const [message, setMessage,] = useState('',)
	const errorData = error as IResponceError
	const history = useHistory()
	const handleSubmit = async(user: IUserSignup,): Promise<void> => {
		mutate(user,)
		setMessage(
			'Confirmation email sent to your email. Please confirm your email folowing the link in the email',
		)
	}
	const handleClick = (): void => {
		history.push(ROUTER_KEYS.LOGIN,)
	}
	return (
		<StyledAuthPageBox>
			<StyledFormBox>
				{status === ILoadStatus.Loading && <Loader />}
				<Typography>Signup</Typography>
				{status === ILoadStatus.Error && (
					<Typography color='error'>{errorData.response.data.message}</Typography>
				)}
				<SignupForm onSubmit={handleSubmit} />
			</StyledFormBox>
			<BaseModal
				isOpen={message !== ''}
				onClose={(): void => {
					setMessage('',)
				}}
				title='Info'
				buttons={
					<Button variant='contained' onClick={handleClick}>
            Go to login
					</Button>
				}
			>
				<p>{message}</p>
			</BaseModal>
		</StyledAuthPageBox>
	)
}
