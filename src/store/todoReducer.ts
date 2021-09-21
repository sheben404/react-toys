import {ADD_TODO, REMOVE_TODO, RESET_TODO, TOGGLE_TODO} from './actionTypes';

export interface Todo {
  id: number,
  text: string,
  state: string
}

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

const todosReducer = (todos: Todo[] = initTodos, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [...todos, action.payload];
    case REMOVE_TODO:
      return todos.filter(todo => todo.id !== action.payload);
    case TOGGLE_TODO:
      return todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      );
    case RESET_TODO:
      return initTodos;
    default:
      return todos;
  }
};

export default todosReducer;
