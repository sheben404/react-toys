import {RESET_FILTER, SET_FILTER} from './actionTypes';

export type FilterType = 'all' | 'todo' | 'done'

const initFilter: FilterType = 'all';

const filterReducer = (filter: FilterType = initFilter, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    case RESET_FILTER:
      return initFilter;
    default:
      return filter;
  }
};

export default filterReducer;
