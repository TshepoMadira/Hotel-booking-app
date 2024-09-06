import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store';
import { Frame1 } from './Frame1';

ReactDOM.render(
  <Provider store={store}>
    <Frame1 />
  </Provider>,
  document.getElementById('root')
);
