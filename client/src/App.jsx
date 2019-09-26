import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header'
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore'
import Collection from './pages/Collection'
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'


function App() {
  const [userToken, setToken] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lockedResult, setLockedResult] = useState('');
  let display;

  function checkForLocalToken () {
    // Look in localStorage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      // No token.
      localStorage.removeItem('mernToken')
      setToken('');
      setUser(null);
    } else {
      // Found token - Send it to be verified.
      axios.post('/auth/me/from/token', {token} )
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setErrorMessage(res.data.message);
          } else {
            // Put token in localStorage
            localStorage.setItem('mernToken', res.data.token)
            // Put token in State
            setToken(res.data.token)
            setUser(res.data.user)
          }
        })
    }
  };

  function liftTokenToState ({token, user}) {
    console.log("INSIDE LIFT TOKEN");
      setToken(token);
      setUser(user);
  };

  function logout () {
    // Remove the token from localStorage
    localStorage.removeItem('mernToken')
    // Remove user & token from state
    setToken('');
    setUser(null);
  };

  function handleClick(e) {
    e.preventDefault()
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
    let config = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    axios.get('./locked/test', config).then( res => {
      setLockedResult(res.data);
    })
  }


  return (
    <div className="App">
      <Router>
        <Header logout={logout} user={user} />
        <div>
          {user.name ? display = `Hello, ${user.name}!` : display = '' }
        </div>
        <Route exact path ='/' render={()=><Landing />}/>
        <Route exact path ='/signup' render={()=><SignUp liftToken={liftTokenToState} />}/>
        <Route exact path ='/login' render={()=><Login liftToken={liftTokenToState}/>}/>
        <Route exact path ='/explore' render={()=><Explore user={user} liftToken={liftTokenToState}/>}/>
        <Route exact path ='/collection' render={()=><Collection user={user} liftToken={liftTokenToState}/>}/>
      </Router>
    </div>
  );
}

export default App;
