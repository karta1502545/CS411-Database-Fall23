import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';

import {
  SearchIcon,
  HomeRoundedIcon,
  SubscriptionsRoundedIcon,
  SupervisedUserCircleRoundedIcon,
  AddRoundedIcon,
  NotificationsRoundedIcon,
  StorefrontRoundedIcon,
  ExitToAppRoundedIcon
} from '../../utils/icons';
// import { useAuth } from '../../context/auth';
// import { ROUTES } from '../../utils/constants';
import worseDayLogo from '../../assets/worseDayIcon.png';
import './Header.scss';
import { Icon } from '@mui/material';

interface HeaderProps {
  photoUrl?: string;
  username: string | null;
}

export default function Header({ photoUrl, username }: HeaderProps): React.ReactElement {
  // const { logout } = useAuth();
  // const history = useHistory();

  // const onLogout = async () => {
  //   try {
  //     await logout();
  //     history.push(ROUTES.SIGNIN);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const redirectToLogin = () => {
    window.location.href = 'http://localhost:3000';
  };
  
  return (
    <div className='header'>
      <div className='headerLeft'>
        <img src={worseDayLogo} alt='fb logo' className='logo' />
        {/* <div className='searchInput'>
          <SearchIcon className='searchIcon' />
          <input type='text' placeholder='Search' className='inputBar' />
        </div> */}
      </div>

      <div className='headerCenter'>
        <div className='activeOption'>
          {/* <IconButton> */}
            <HomeRoundedIcon fontSize='large' className='icon' />
          {/* </IconButton> */}
        </div>
        {/* <div className='option'>
          <SubscriptionsRoundedIcon fontSize='large' className='icon' />
        </div>
        <div className='option'>
          <StorefrontRoundedIcon fontSize='large' className='icon' />
        </div>
        <div className='option'>
          <SupervisedUserCircleRoundedIcon fontSize='large' className='icon' />
        </div> */}
      </div>

      <div className='headerRight'>
        <div className='info'>
          <Avatar src={photoUrl} />
          <h4>{username}</h4>
        </div>
        {/* <IconButton>
          <AddRoundedIcon />
        </IconButton> */}
        {/* <IconButton>
          <NotificationsRoundedIcon />
        </IconButton> */}
        <IconButton onClick={redirectToLogin}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}
