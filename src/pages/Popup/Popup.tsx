import React from 'react';
import Greetings from '../../containers/Greetings/Greetings';
import { Logo } from './Logo';

import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World
        </a>
      </header>
      <Greetings />
    </div>
  );
};

export default Popup;
