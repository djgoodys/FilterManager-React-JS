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
        if(action.payload && action.payload.login === "logout"){state.loggedIn = false
        localStorage.setItem("loggedin", "false"
        )
        }
        if(state.userData && state.userData.login === "passed"){
          state.loggedIn = true;
          localStorage.setItem("loggedin", "true")}
        state.error = '';
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;  // Set to null for consistency
        state.error = action.error.message;
      })

      .addCase(Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
          state.loggedIn = false;
          localStorage.setItem("loggedin", "false")
        state.error = '';
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default loginSlice.reducer;
