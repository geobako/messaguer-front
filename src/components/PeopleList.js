import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { apiUrl } from '../utils';
import axios from 'axios';
import { GiftedChat } from 'react-web-gifted-chat';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    height: '80vh',
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

export default function PeopleList({ socket, user, setUsers, onPing }) {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(`${apiUrl}/messages`);
      setMessages(GiftedChat.append([], res.data.messages.reverse()));
    };

    getMessages();

    socket.on('new-message', data => {
      setMessages(m => GiftedChat.append(m, [data.message]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = async newMessages => {
    try {
      const newMessage = {
        id: newMessages[0].id,
        text: newMessages[0].text,
        user: {
          id: user._id,
          avatar: user.avatar,
          name: user.name
        }
      };

      const res = await axios.post(`${apiUrl}/new-message`, {
        message: newMessage
      });
      // socket.broadcast.emit('save-message', { message: newMessage });

      setMessages(GiftedChat.append(messages, newMessages));

      socket.emit('message-sent', { message: res.data.message });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar
        user={{
          id: user._id,
          // avatar: require(`../assets/${user.avatar}.jpg`) || null,
          name: user.name
        }}
      />
    </div>
  );
}
