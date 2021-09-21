import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

store.subscribe(() => console.log('update component'));

export default store;
