import {createSlice} from '@reduxjs/toolkit';
import {Todo} from './reducer';

const initTodos: Todo[] = [
  {
    id: 1,
    text: '抽烟',
    state: 'done'
  },
  {
    id: 2,
    text: '喝酒',
    state: 'done'
  },
  {
    id: 3,
    text: '烫头',
    state: 'done'
  }
];

const todosSlice = createSlice({
  name: 'todos',
  initialState: initTodos,
  reducers: {
    addTodo: (todos: Todo[], action: any) => {
      todos.push(action.payload);
    },
    removeTodo: (todos: Todo[], action: any) => {
      return todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (todos: Todo[], action: any) => {
      return todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      );
    }
  }
});

export const {actions} = todosSlice

export default todosSlice;
