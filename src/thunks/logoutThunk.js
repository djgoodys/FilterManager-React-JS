
import { createAsyncThunk } from '@reduxjs/toolkit';

export const Logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return {loggedIn:false}; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

