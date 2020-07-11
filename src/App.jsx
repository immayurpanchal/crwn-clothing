import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { auth } from './firebase/firebase.utils';
import Homepage from './pages/Homepage';
import Shop from './pages/Shop/Shop';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unscribeFromAuth = null;

  componentDidMount() {
    this.unscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
