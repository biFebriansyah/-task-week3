import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './Reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = createStore(
//   reducers,
//   applyMiddleware(logger, promiseMiddleware)
// )

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  let persistor = persistStore(store)
  return { store, persistor }
}