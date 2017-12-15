import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers'

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


render(
  <Provider store={store}>
      <App/>
  </Provider>
  ,document.getElementById('root')
);
