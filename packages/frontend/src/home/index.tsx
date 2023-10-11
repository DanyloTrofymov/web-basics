import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { UserTableContainer } from '../common/pages';

import { useUser } from '../hooks/user.hooks';
import Loader from '../common/utils/loader.styled';
import { StyledBox } from './home.styled';
import { ILoadStatus } from '../common/types/loadingStatuses.type';
import { UserInfoPage } from '../common/pages/user/userInfo.page';
import { IUser } from '../common/types/user.type';

const HomePageContainer = () => {
  const { status: userStatus, data: user } = useUser();
  const history = useHistory();

  useEffect(() => {}, [user, userStatus, history]);

  if (userStatus === ILoadStatus.Loading) {
    return (
      <StyledBox>
        <Loader />
      </StyledBox>
    );
  }
  if (user?.data !== undefined && user?.data.isAdmin === true) {
    return <UserTableContainer />;
  }

  return <UserInfoPage user={user?.data as IUser} />;
};

export default HomePageContainer;
