import {ADD_TODO, REMOVE_TODO, SET_FILTER, TOGGLE_TODO} from './actionTypes';
import {FilterType} from './filterReducer';

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

export const setFilter = (filter: FilterType) => ({
  type: SET_FILTER,
  payload: filter
});

