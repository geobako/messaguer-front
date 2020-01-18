import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import io from 'socket.io-client';

const socket = io('http://localhost:5001', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999
});

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login socket={socket} />
          </Route>
          <Route path='/home' exact>
            <Home socket={socket} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
