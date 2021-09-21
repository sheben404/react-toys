import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import todosReducer from './todos/reducer';
import filterReducer from './filter/reducer';


const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

store.subscribe(() => console.log('update component'));

export default store;
