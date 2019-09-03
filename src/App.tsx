import React from 'react';
import './App.scss';

import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './component/AppContainer';

import config from './config';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <AppContainer routerLinks={config.routerLinks} />
      </Router>
    </div>
  );
}

export default App;
