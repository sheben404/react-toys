import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import todosSlice from './todos/slice'
import filterReducer from './filter/reducer';
import { combineReducers,configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  todos: todosSlice.reducer,
  filter: filterReducer
});

const store = configureStore({
  reducer,
  devTools: true
})

store.subscribe(() => console.log('update component'));

export default store;
