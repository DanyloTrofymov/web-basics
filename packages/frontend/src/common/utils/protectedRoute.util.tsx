import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/user.hooks';
import Loader from './loader.styled';
import { StyledBox } from '../../home/home.styled';
import { ILoadStatus } from '../types/loadingStatuses.type';
import { ROUTER_KEYS } from '../consts/app-keys.const';

interface ProtectedRouteProps {
  children: ReactElement<any, any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { status: userStatus, data: user } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (user?.data === null || userStatus === ILoadStatus.Error) {
      history.push(ROUTER_KEYS.LOGIN);
    }
  }, [user, userStatus, history]);

  if (userStatus === ILoadStatus.Loading) {
    return (
      <StyledBox>
        <Loader />
      </StyledBox>
    );
  }

  return children;
};

export default ProtectedRoute;
