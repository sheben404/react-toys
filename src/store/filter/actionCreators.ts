import {FilterType} from './reducer';
import {SET_FILTER} from './actionTypes';

export const setFilter = (filter: FilterType) => ({
  type: SET_FILTER,
  payload: filter
});
