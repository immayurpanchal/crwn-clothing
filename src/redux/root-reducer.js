import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/cart.reducer.js';
import userReducer from './user/user.reducer.js';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root', // name of the key
  storage, // using localStorage
  whitelist: ['cart'] // list of reducers which needs to be persisted in the localStorage
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export default persistReducer(persistConfig, rootReducer);
