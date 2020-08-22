import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Homepage from './pages/Homepage';
import Shop from './pages/Shop/Shop';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import Checkout from './pages/Checkout';

class App extends React.Component {
  unscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if user is logged in via firebase, userAuth contains details of the user
      if (userAuth) {
        // create user profile in firebase DB and get the userRef
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // snapshot.data() contains the user data stored in the firestore DB
          // snapshot.id contains the unique id
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      } else {
        // useAuth=null in case user is not logged in
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            path="/signin"
            render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({ currentUser: selectCurrentUser });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
