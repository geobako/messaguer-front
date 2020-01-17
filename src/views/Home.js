import React, { useState } from 'react';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SmsIcon from '@material-ui/icons/Sms';
import PeopleLIst from '../components/PeopleList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bottomNavigation: {
    width: 500,
    backgroundColor: 'whiteSmoke',
    alignSelf: 'center',
    boxShadow: '0px 2px 4px -2px rgba(0,0,0,5)'
  }
}));

function Home({ socket }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className={classes.root}>
      <AppBar socket={socket} />
      {value === 0 ? <PeopleLIst socket={socket} /> : null}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label='People' icon={<AccountBoxIcon />} />
        <BottomNavigationAction label='messages' icon={<SmsIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default Home;
