import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar({
  notifications,
  badge,
  setBadge,
  logout
}) {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(null);

  const onNotificationClick = e => {
    setShowMenu(e.currentTarget);
    setBadge(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            id='simple-menu'
            aria-haspopup='true'
            aria-label='show 11 new notifications'
            color='inherit'
            onClick={logout}
          >
            <ExitToAppIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Welcome Chicos
          </Typography>
          <IconButton
            id='simple-menu'
            aria-haspopup='true'
            aria-label='show 11 new notifications'
            color='inherit'
            onClick={onNotificationClick}
          >
            <Badge badgeContent={badge} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={showMenu}
            keepMounted
            open={Boolean(showMenu)}
            onClose={() => setShowMenu(null)}
          >
            {notifications.length === 0 ? (
              <MenuItem onClick={() => setShowMenu(null)}>
                No Notifications
              </MenuItem>
            ) : (
              notifications.map(not => {
                return (
                  <MenuItem onClick={() => setShowMenu(null)}>{not}</MenuItem>
                );
              })
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
