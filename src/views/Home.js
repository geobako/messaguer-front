import React, { useState, useEffect } from 'react';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SmsIcon from '@material-ui/icons/Sms';
import PeopleLIst from '../components/PeopleList';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [badge, setBadge] = useState(0);
  const [user, setUser] = useState({ name: '' });

  const location = useLocation();

  let history = useHistory();

  useEffect(() => {
    if (!location.state.user) {
      history.push('/');
    }
    setUser(location.state.user);
  }, [history, location, location.state]);

  const logout = () => {
    socket.emit('logout', { id: socket.id });
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar
        socket={socket}
        badge={badge}
        notifications={notifications}
        setBadge={setBadge}
        user={user}
        logout={logout}
      />
      {value === 0 ? (
        <PeopleLIst user={user} setUsers={setUsers} socket={socket} />
      ) : null}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label='messages' icon={<SmsIcon />} />
      </BottomNavigation>
      <ToastContainer />
    </div>
  );
}

export default Home;
