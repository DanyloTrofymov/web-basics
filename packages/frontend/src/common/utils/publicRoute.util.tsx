import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/user.hooks';
import Loader from './loader.styled';
import { StyledBox } from '../../home/home.styled';
import { ILoadStatus } from '../types/loadingStatuses.type';
import { ROUTER_KEYS } from '../consts/app-keys.const';

interface PublicRouteProps {
  children: ReactElement<any, any>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { status: userStatus, data: user } = useUser();
  const history = useHistory();

  useEffect(() => {
    if ((user?.data !== null, userStatus === ILoadStatus.Success)) {
      history.push(ROUTER_KEYS.ROOT);
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

export default PublicRoute;
