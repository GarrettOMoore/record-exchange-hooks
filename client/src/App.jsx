import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Logo from './whitelogo.png'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="logo" width={'10%'} height={'10%'} />
        <SignUp />
      </header>
    </div>
  );
}

export default App;
