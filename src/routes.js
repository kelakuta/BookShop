"use strict"
import React from 'react';
import {render} from 'react-dom';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={BooksList}/>
      <Route path="/admin" component={BooksForm}/>
      <Route path="/cart" component={Cart}/>
    </Route>
  </Router>
);

export default routes
