"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';

import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

//step 1 create store
const middleware = applyMiddleware(thunk, logger());
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);
console.log('client');
import routes from './routes'
const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)
render(
  Routes, document.getElementById('app')
);
