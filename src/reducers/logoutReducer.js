import { createSlice } from '@reduxjs/toolkit';
import { Logout } from '../thunks/logoutThunk';

const logoutSlice = createSlice({
  name: 'userData',
  initialState: {
    loggedIn: false,
    loading: false, 
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
          state.loggedIn = false;
          alert("logged out")
          localStorage.setItem("loggedin", "false")
        state.error = '';
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

export default logoutSlice.reducer;
