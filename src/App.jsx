import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
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
    this.unscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if user is logged in via firebase, userAuth contains details of the user
      if (userAuth) {
        // create user profile in firebase DB and get the userRef
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // snapshot.data() contains the user data stored in the firestore DB
          // snapshot.id contains the unique id
          this.setState({ currentUser: { id: snapShot.id, ...snapShot.data() } });
        });
      } else {
        // useAuth=null in case user is not logged in
        this.setState({ currentUser: userAuth });
      }
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
