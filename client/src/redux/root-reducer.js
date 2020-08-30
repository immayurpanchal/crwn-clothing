import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/cart.reducer.js';
import directoryReducer from './directory/directory.reducer.js';
import shopReducer from './shop/shop.reducer.js';
import userReducer from './user/user.reducer.js';

const persistConfig = {
  key: 'root', // name of the key
  storage, // using localStorage
  whitelist: ['cart'] // list of reducers which needs to be persisted in the localStorage
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
