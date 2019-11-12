import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from './self/redux';
import { Provider } from './self/react-redux';
import thunk from './self/redux-thunk';
import arrayThunk from './self/array-thunk';
import App from './App';
import { counter } from './counter';

const store = createStore(counter, compose(applyMiddleware(thunk, arrayThunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

