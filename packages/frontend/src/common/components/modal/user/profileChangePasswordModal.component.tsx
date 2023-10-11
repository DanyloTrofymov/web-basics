import React from 'react';
import { BaseModal } from '../baseModal/baseModal.component';
import { IUser, IUserChangePassword } from '../../../types/user.type';
import { ChangePasswordForm } from '../../form/userForm/changePasswordForm.component';
import { useChangePasswordMutation } from '../../../../hooks/user.hooks';
import { IResponceError } from '../../../types/responce.type';
import { ILoadStatus } from '../../../types/loadingStatuses.type';

interface ProfileModalProps {
  isOpen: boolean;
  user: IUser | undefined;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const ProfileChangePasswordModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  setErrorMessage
}) => {
  if (!isOpen || !user) {
    return null;
  }
  const { status, mutate, error } = useChangePasswordMutation();
  const errorData = error as IResponceError;
  const handleSubmit = async (newUser: IUserChangePassword) => {
    mutate(newUser);
    if (status === ILoadStatus.Error) {
      setErrorMessage(errorData.response.data.message);
    }
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Change password">
      <ChangePasswordForm onClose={onClose} onSubmit={handleSubmit} user={user} />
    </BaseModal>
  );
};
