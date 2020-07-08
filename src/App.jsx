import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import { Switch, Route } from 'react-router-dom';

const HatsPage = () => {
  return <div>Hats page</div>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
