import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import todosSlice from './todos/slice'
import filterSlice from './filter/slice'
import { combineReducers,configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer
});

const store = configureStore({
  reducer,
  devTools: true
})

store.subscribe(() => console.log('update component'));

export default store;
