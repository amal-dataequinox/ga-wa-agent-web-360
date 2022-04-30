import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './contexts/JWTContext';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import {persistor, store } from './redux-persist/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SnackbarProvider } from 'notistack';
import { SocketProvider } from './contexts/SocketContext';

ReactDOM.render(
  // <Provider store={store}>
  <SocketProvider>
<PersistGate persistor={persistor}>
  <Provider store={configureStore()}>
    <AuthProvider>
      <SnackbarProvider  anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}>
      <App />
      </SnackbarProvider>
    </AuthProvider>
  </Provider>
  </PersistGate>
  </SocketProvider>
  //  </Provider>,
  ,document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
