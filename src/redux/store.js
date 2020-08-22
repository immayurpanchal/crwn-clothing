import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';

const middleware = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

export default store;
