import {createStore, combineReducers} from 'redux';
import todosReducer from './todoReducer';
import filterReducer from './filterReducer';

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
})

const store = createStore(reducer);

store.subscribe(() => console.log('update component'));

export default store;
