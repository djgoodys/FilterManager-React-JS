import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  dataTableRef: null,
};

export const setDataTableRef = createAsyncThunk(
  'dataTable/setDataTableRef',
  (ref) => ref
);

const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDataTableRef.fulfilled, (state, action) => {
      state.dataTableRef = action.payload;
    });
  },
});

export default dataTableSlice.reducer;