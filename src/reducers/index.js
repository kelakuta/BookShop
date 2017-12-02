"use strict"
import {combineReducers} from 'redux';
import {booksR} from './booksReducers';
import {cartR} from './cartReducers';

export default combineReducers({
  books: booksR,
  cart: cartR
})
