import React from 'react';

import './App.css';
import Logo from './components/UI/Logo/Logo';
import CarpoolBuilder from './containers/CarpoolBuilder/CarpoolBuilder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <div className="App-title">
          Let's Make Some Carpool Magic!
        </div>
      </header>
      <div className="App-body">
          <CarpoolBuilder />
      </div>
    </div>
  );
}

export default App;
