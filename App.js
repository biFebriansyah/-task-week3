import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './src/public/Redux/Store';
import Root from './src/Root';
const persistStore = store();

const App = () => {

  return (
    <Provider store={persistStore.store}>
      <PersistGate loading={null} persistor={persistStore.persistor}>
        <Root />
      </PersistGate>
    </Provider>
  )
}

export default App;

