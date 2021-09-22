import {createSlice} from '@reduxjs/toolkit';

export type FilterType = 'all' | 'todo' | 'done'

const initFilter: FilterType = 'all';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initFilter,
  reducers: {
    setFilter: (state, action: any) => {
      return action.payload
    },
    resetFilter: (state, action: any) => {
      return initFilter
    },
  }
});

export const {actions} = filterSlice

export default filterSlice;
