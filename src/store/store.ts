import {createStore, combineReducers} from 'redux';
import todosReducer from './todos/reducer';
import filterReducer from './filter/reducer';

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
})

const store = createStore(reducer);

store.subscribe(() => console.log('update component'));

export default store;
