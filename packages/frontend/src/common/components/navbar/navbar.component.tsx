import React, {
	useState,
} from 'react'
import {
	AppBar, Toolbar, Typography,
} from '@mui/material'
import {
	useHistory,
} from 'react-router-dom'
import {
	useUser,
} from '../../../hooks/user.hooks'
import {
	BaseModal,
	ProfileChangePasswordModal,
	ProfileDeleteModal,
	ProfileEditModal,
	ProfileViewModal,
} from '../modal'
import {
	NavbarButtons,
} from './navbarButtons.component'
import {
	ROUTER_KEYS,
} from '../../consts/app-keys.const'

export const Navbar = (): React.JSX.Element => {
	const {
		data,
	} = useUser()
	const history = useHistory()
	const [isDeleteOpen, setIsDeleteOpen,] = useState(false,)
	const [isChangePasswordOpen, setIsChangePasswordOpen,] = useState(false,)
	const [isViewOpen, setIsViewOpen,] = useState(false,)
	const [isEditOpen, setIsEditOpen,] = useState(false,)
	const [errorMessage, setErrorMessage,] = useState('',)
	const user = data?.data

	const handleChangePassword = (): void => {
		setIsChangePasswordOpen(true,)
	}

	const handleView = (): void => {
		setIsViewOpen(true,)
	}

	const handleDelete = (): void => {
		setIsDeleteOpen(true,)
	}

	const handleEdit = (): void => {
		setIsViewOpen(false,)
		setIsEditOpen(true,)
	}

	const handleLogin = (): void => {
		history.push(ROUTER_KEYS.LOGIN,)
	}
	const handleSignup = (): void => {
		history.push(ROUTER_KEYS.SIGNUP,)
	}
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{
					flexGrow: 1,
				}}>
					Todo
				</Typography>
				<NavbarButtons
					user={data}
					handleLogin={handleLogin}
					handleSignup={handleSignup}
					handleView={handleView}
				/>
			</Toolbar>
			<ProfileViewModal
				isOpen={isViewOpen}
				user={user}
				onClose={(): void => {
					setIsViewOpen(false,)
				}}
				handleEdit={handleEdit}
			/>
			<ProfileEditModal
				isOpen={isEditOpen}
				user={user}
				onClose={(): void => {
					setIsEditOpen(false,)
				}}
				setErrorMessage={setErrorMessage}
				handleDelete={handleDelete}
				handleChangePassword={handleChangePassword}
			/>
			<ProfileDeleteModal
				isOpen={isDeleteOpen}
				user={user}
				onClose={(): void => {
					setIsDeleteOpen(false,)
				}}
				setErrorMessage={setErrorMessage}
			/>
			<ProfileChangePasswordModal
				isOpen={isChangePasswordOpen}
				onClose={(): void => {
					setIsChangePasswordOpen(false,)
				}}
				setErrorMessage={setErrorMessage}
				user={user}
			/>
			<BaseModal isOpen={errorMessage !== ''} onClose={(): void => {
				setErrorMessage('',)
			}} title='Error'>
				<p>{errorMessage}</p>
			</BaseModal>
		</AppBar>
	)
}
