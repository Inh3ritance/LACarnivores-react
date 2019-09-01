import React from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './Nav/Nav.js';
import Body from './Body/Body.js';
import Footer from './Footer/Footer.js';

function App() {
  return (
  <div>
	<Nav/>
	<Body/>
	<Footer/>
  </div>
    
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}

export default App;
