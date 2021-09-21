export type FilterType = 'all' | 'todo' | 'done'

const initFilter: FilterType = 'all';

const filterReducer = (filter: FilterType = initFilter, action: any) => {
  switch (action.type) {
    case 'setFilter':
      return action.payload;
    case 'reset':
      return initFilter;
    default:
      return filter;
  }
};

export default filterReducer;
