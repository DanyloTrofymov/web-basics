import React from 'react';
import { Button } from '@mui/material';
import { IResponceCurrentUser } from '../../types/responce.type';

interface NavbarButtonsProps {
  user: IResponceCurrentUser | undefined | null;
  handleView: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
}

export const NavbarButtons: React.FC<NavbarButtonsProps> = ({
  user,
  handleView,
  handleLogin,
  handleSignup
}) => {
  if (user === null || user === undefined) {
    return (
      <>
        <Button color="inherit" onClick={handleSignup}>
          Sign up
        </Button>
        <Button color="inherit" onClick={handleLogin}>
          Login
        </Button>
      </>
    );
  }
  return (
    <Button color="inherit" onClick={handleView}>
      Profile
    </Button>
  );
};
