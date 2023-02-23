import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/store/store.js';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';
import GlobalModal from './components/GlobalModal';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalModal />
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);