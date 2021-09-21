import {StoreType} from '../../TodoApp';

export const selectFilteredTodos = (state: StoreType) => {
  const todos = Object.values(state.todos);
  if (state.filter === 'all') {
    return todos;
  }
  return todos.filter(todo => todo.state === state.filter);
};

export const selectTodoNeeded = (state: StoreType): number => {
  return Object.values(state.todos).filter(todo => todo.state === 'todo').length;
};
