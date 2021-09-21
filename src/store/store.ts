import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import todosReducer from './todos/reducer';
import filterReducer from './filter/reducer';


const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

store.subscribe(() => console.log('update component'));

export default store;
