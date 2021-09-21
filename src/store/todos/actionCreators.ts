import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './actionTypes';

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: new Date(),
    text,
    state: 'todo'
  }
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id
});

