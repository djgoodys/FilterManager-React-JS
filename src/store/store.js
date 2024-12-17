import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginSlice from '../reducers/loginReducer';
import equipmentSlice from '../reducers/equipmentSlice';
import filterTypesSlice from '../reducers/filterTypesReducer';
import tasksReducer from '../reducers/tasksReducer.js';
import usersReducer from '../reducers/usersReducer.js'
import filtersSlice from '../reducers/filtersReducer'
import dataTableSlice from '../reducers/refDataTableReducer'
import { thunk } from 'redux-thunk';
// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  userData: loginSlice,
  loggedIn: loginSlice,
  backup_folder: loginSlice,
  equipment: equipmentSlice,
  filter_types: filterTypesSlice,
  tasks: tasksReducer,
  users: usersReducer,
  filters: filtersSlice,
  dataTableRef: dataTableSlice,
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer
});

export default store;
