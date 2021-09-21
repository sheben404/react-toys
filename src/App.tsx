import React, {FC} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import 'antd/dist/antd.css'
import './app.scss'
import TodoApp from './TodoApp';

const App: FC = () => {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
};

export default App;
