import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { ModalProvider } from './context/Modal';
import ChannelProvider from './context/channelContext';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChannelProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ChannelProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
