import React from 'react';
import Homepage from './pages/Homepage';
import { Switch, Route } from 'react-router-dom';
import Shop from './pages/Shop/Shop';
import Header from './components/Header/Header';

import './App.scss';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
    </div>
  );
};

export default App;
