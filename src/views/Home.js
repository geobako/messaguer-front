import React, { useState, useEffect } from 'react';
import AppBar from '../components/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SmsIcon from '@material-ui/icons/Sms';
import PeopleLIst from '../components/PeopleList';
import { useHistory } from 'react-router-dom';
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

  let history = useHistory();

  useEffect(() => {
    console.log(socket.id);
    socket.emit('getUsers', { id: socket.id });
  }, [socket]);

  socket.on('users', data => {
    setUsers(data.users);
  });
  socket.on('disconnected', data => {
    console.log(data);
    setUsers(data.users.filter(el => el.id !== socket.id));
  });

  socket.on('UserAdded', data => {
    setBadge(badge + 1);
    let newNotifications = [...notifications];
    newNotifications.push(`${data.user.name} joined!`);
    setNotifications(newNotifications);
    setUsers([...users, data.user]);
  });

  socket.on('userLoggedOut', data => {
    setBadge(badge + 1);
    let newNotifications = [...notifications];
    newNotifications.push(`A user logged out`);
    setNotifications(newNotifications);
    setUsers(data.users.filter(el => el.id !== socket.id));
  });

  const logout = () => {
    socket.emit('logout', { id: socket.id });
    history.push('/');
  };

  socket.on('pinged', data => {
    console.log('ssssss');
    toast.info(`${data.by.name} just pinged you!`, {
      position: toast.POSITION.TOP_CENTER
    });
  });

  const onPing = data => {
    console.log(data, socket.id);
    socket.emit('someonePinged', { user: data, by: socket.id });
    toast.success(`Succesfully pinged ${data.name} !`, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  return (
    <div className={classes.root}>
      <AppBar
        socket={socket}
        badge={badge}
        notifications={notifications}
        setBadge={setBadge}
        logout={logout}
      />
      {value === 0 ? (
        <PeopleLIst
          onPing={onPing}
          users={users}
          setUsers={setUsers}
          socket={socket}
        />
      ) : null}
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
      <ToastContainer />
    </div>
  );
}

export default Home;
