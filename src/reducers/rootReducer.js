import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer.js';
import filterTypesReducer from './filterTypesReducer.js';
import equipmentReducer from './equipmentReducer';
import dataTableSlice from './refDataTableReducer';
import tasksSlice from './tasksReducer';
import filtersSlice from './filtersReducer';
import usersSlice from './usersReducer';

const rootReducer = combineReducers({
  userData: loginReducer,
  list_equipment: equipmentReducer,
  filter_types: filterTypesReducer,
  dataTable: dataTableSlice,
  tasks: tasksSlice,
  filters: filtersSlice,
  users: usersSlice
});

export default rootReducer;

