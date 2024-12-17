import { createSlice } from '@reduxjs/toolkit';
import { Login } from '../thunks/loginThunk';
import { Logout } from '../thunks/logoutThunk';

const loginSlice = createSlice({
  name: 'userData',
  initialState: {
    loggedIn: false,
    backup_folder: '',
    loading: false, 
    userData: null,  // Set to null for consistency
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        if (state.userData && state.userData.hasOwnProperty('backup_folder')) {
          state.backup_folder = state.userData.backup_folder;
        }
        if (action.payload.login === "passed") {
          state.loggedIn = true;
        }
        state.error = '';
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;  // Set to null for consistency
        state.loggedIn = false;
        state.error = action.error.message;
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.userData = null;  // Set to null for consistency
        state.backup_folder = '';
        state.loading = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export default loginSlice.reducer;
