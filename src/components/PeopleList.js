import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    height: 700,
    alignSelf: 'center',
    boxShadow: '0px 2px 4px -2px rgba(0,0,0,5)'
  },
  list: {
    width: '100%',
    maxWidth: 450
  },
  inline: {
    display: 'inline'
  }
}));

export default function PeopleList({ socket, users, setUsers, onPing }) {
  const classes = useStyles();
  console.log(users);

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {users.length === 0 ? (
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar alt='N' src='/static/images/avatar/1.jpg' />
            </ListItemAvatar>
            <ListItemText primary='No user is online' />
          </ListItem>
        ) : (
          users.map(user => (
            <>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt={user.name} src='/static/images/avatar/1.jpg' />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <Button
                  onClick={() => onPing(user)}
                  variant='contained'
                  color='secondary'
                >
                  Ping
                </Button>
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          ))
        )}
      </List>
    </div>
  );
}
