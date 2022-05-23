import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style.scss';
import Router from './Router';
import { store } from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router></Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
