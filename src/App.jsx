/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';

const Homepage = lazy(() => import('./pages/Homepage'));
const Shop = lazy(() => import('./pages/Shop'));
const Checkout = lazy(() => import('./pages/Checkout'));
const SignInAndSignUpPage = lazy(() => import('./pages/SignInAndSignUpPage'));

const App = (props) => {
	const { currentUser, setCurrentUser } = props;
	useEffect(() => {
		const unscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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

		return () => unscribeFromAuth();
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
						<Route exact path='/' component={Homepage} />
						<Route path='/shop' component={Shop} />
						<Route exact path='/checkout' component={Checkout} />
						<Route
							path='/signin'
							render={() =>
								currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
							}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
