import React from 'react';
import { Button } from '@mui/material';
import { BaseModal } from '../baseModal/baseModal.component';
import { IUser } from '../../../types/user.type';
import { useUserDeleteMutation } from '../../../../hooks/user.hooks';
import { IResponceError } from '../../../types/responce.type';
import { ILoadStatus } from '../../../types/loadingStatuses.type';

interface ProfileModalProps {
  isOpen: boolean;
  user: IUser | undefined;
  onClose: () => void;
  setErrorMessage: (error: string) => void;
}

export const ProfileDeleteModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  setErrorMessage
}) => {
  if (!isOpen || !user) {
    return null;
  }
  const { status, mutate, error } = useUserDeleteMutation();
  const errorData = error as IResponceError;
  const handleSubmit = async () => {
    mutate(user.id);
    if (status === ILoadStatus.Error) {
      setErrorMessage(errorData.response.data.message);
    }
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete"
      buttons={
        <>
          <Button onClick={() => handleSubmit()} variant="outlined" color="error">
            Yes
          </Button>
          <Button onClick={onClose} variant="contained" color="info">
            No
          </Button>
        </>
      }
    >
      <p>Do you want to delete your profile?</p>
    </BaseModal>
  );
};
