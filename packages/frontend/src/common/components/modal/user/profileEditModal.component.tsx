import React from 'react';
import { BaseModal } from '../baseModal/baseModal.component';
import { IUser, IUserUpdate } from '../../../types/user.type';
import { EditUserForm } from '../../form/userForm/userEditForm.component';
import { useEditMutation } from '../../../../hooks/user.hooks';
import { IResponceError } from '../../../types/responce.type';
import { ILoadStatus } from '../../../types/loadingStatuses.type';

interface ProfileModalProps {
  isOpen: boolean;
  user: IUser | undefined;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
  handleChangePassword: () => void;
  handleDelete: () => void;
}

export const ProfileEditModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  setErrorMessage,
  handleChangePassword,
  handleDelete
}) => {
  if (!isOpen || !user) {
    return null;
  }
  const { status, mutate, error } = useEditMutation();
  const errorData = error as IResponceError;

  const handleSubmit = async (newUser: IUserUpdate) => {
    mutate(newUser);
    if (status === ILoadStatus.Success) {
      onClose();
    }
    if (status === ILoadStatus.Error) {
      setErrorMessage(errorData.response.data.message);
    }
  };
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit">
      <EditUserForm
        onClose={onClose}
        onSubmit={handleSubmit}
        user={user}
        onChangePassword={handleChangePassword}
        onDelete={handleDelete}
      />
    </BaseModal>
  );
};
