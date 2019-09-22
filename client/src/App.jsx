import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import SignUp from './pages/SignUp';
import Logo from './whitelogo.png'


function App() {
  const [userToken, setToken] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lockedResult, setLockedResult] = useState('');

  function checkForLocalToken () {
    // Look in localStorage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      // No token.
      localStorage.removeItem('mernToken')
      setToken('');
      setUser(null)
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
      <header className="App-header">
        <img src={Logo} className="logo" width={'10%'} height={'10%'} />
        <SignUp liftToken={liftTokenToState} />
      </header>
    </div>
  );
}

export default App;
