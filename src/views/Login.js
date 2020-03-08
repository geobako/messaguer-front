import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { apiUrl } from '../utils';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeUser } from '../subscription';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: '70%'
  },
  paper: {
    padding: 100,
    minWidth: 300,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
}));

function Login({ socket }) {
  const [username, setUsername] = useState('');
  const classes = useStyles();
  let history = useHistory();

  const onClick = async () => {
    try {
      if (!username) {
        toast.info(`Please provide a username`, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      const res = await axios.post(`${apiUrl}/admin/auth/login`, {
        name: username,
        avatar: ''
      });
      socket.emit('login', { ...res.data, isMobile: false });
      subscribeUser(res.data.user);
      history.push({
        pathname: '/home',
        state: { user: res.data.user }
      });
    } catch (err) {
      toast.error(`Something unexpected happened`, {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <TextField
          value={username}
          onChange={e => setUsername(e.target.value)}
          id='standard-basic'
          label='Enter your username'
        />
        <Button
          variant='contained'
          color='primary'
          onClick={onClick}
          className={classes.button}
          startIcon={<ExitToAppIcon />}
        >
          Login
        </Button>
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default Login;
