"use strict"
import {createStore} from 'redux';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';

//step 3 define reducers
export function booksR(state={books:[]}, action) {
  // deepFreeze(state);
  switch (action.type) {
    case "GET_BOOKS":
    return {...state, books:[...bookR(undefined, action)]};
    break;

    case "POST_BOOK":
    return {...state, books:[...state.books, ...bookR(undefined, action)],
      msg:'Saved! Click to continue', style:'success', validation:'success'};
    break;

    case "POST_BOOK_REJECTED":
    return {...state, msg:'Please, try again',
      style:'danger', validation:'error' };
    break;

    case "RESET_BUTTON":
    return {...state, msg:null, style:'primary', validation:null};
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books];
    const indexToDelete = currentBookToDelete.findIndex(
      (book) => {
        return book._id == action.payload;
      }
    );
    return {books:
      [...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)
    ]};

    case "UPDATE_BOOK":
    return state.map(b => bookR(b, action));
    break;
    default:
    return state;
  }
}
const bookR = (state, action) => {
  switch (action.type) {
    case 'GET_BOOKS':
    case 'POST_BOOK':
      if(Object.prototype.toString.call(action.payload) !== '[object Array]') {
        return [action.payload];
      }
      let tmpArray = [];
      for (var i = 0; i < action.payload.length; i++) {
        tmpArray.push(action.payload[i]);
      }

    return tmpArray;

    case 'UPDATE_BOOK':
      if (state._id !== action.payload._id) {
        return state;
      }
      return {...state, title: action.payload.title};
      break;
    default:
    return state;
  }
}
