import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'crwn-db-dfad9.firebaseapp.com',
  databaseURL: 'https://crwn-db-dfad9.firebaseio.com',
  projectId: 'crwn-db-dfad9',
  storageBucket: 'crwn-db-dfad9.appspot.com',
  messagingSenderId: '915065377520',
  appId: '1:915065377520:web:be9e86066dd78959b46835',
  measurementId: 'G-71QTNQX9WJ'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // useAuth = google firebase auth object
  // if user is not logged in return
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // Add user in DB if doeesn't exists
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // return the userRef object for further usage, if required
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
