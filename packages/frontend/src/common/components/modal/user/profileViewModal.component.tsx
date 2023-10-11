import React, {
	useState,
} from 'react'
import {
	Button, Typography,
} from '@mui/material'
import {
	useHistory,
} from 'react-router-dom'
import {
	BaseModal,
} from '../baseModal/baseModal.component'
import {
	IUser,
} from '../../../types/user.type'
import Loader from '../../../utils/loader.styled'
import {
	ROUTER_KEYS,
} from '../../../consts/app-keys.const'
import {
	useLogout,
} from '../../../../hooks/user.hooks'

interface IProfileModalProps {
  isOpen: boolean;
  user: IUser | undefined;
  onClose: () => void;
  handleEdit: () => void;
}

export const ProfileViewModal: React.FC<IProfileModalProps> = ({
	isOpen,
	user,
	onClose,
	handleEdit,
},) => {
	const [isLoading, setIsLoading,] = useState(false,)
	const history = useHistory()
	const logout = useLogout()

	if (isOpen === false || typeof user === 'undefined') {
		return null
	}

	const handleLogout = async(): Promise<void> => {
		setIsLoading(true,)
		logout()
		history.push(ROUTER_KEYS.LOGIN,)
		setIsLoading(false,)
		onClose()
	}
	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			title='View'
			buttons={
				<>
					<Button onClick={handleEdit} variant='contained' color='info'>
            Edit
					</Button>
					<Button onClick={handleLogout} variant='contained' color='error'>
            Logout
					</Button>
				</>
			}
		>
			{isLoading && <Loader />}
			<Typography variant='h5'>{user?.username}</Typography>
			<Typography>{user?.email}</Typography>
		</BaseModal>
	)
}
