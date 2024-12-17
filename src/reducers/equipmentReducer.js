import { createSlice } from '@reduxjs/toolkit';
import { manageEquipment } from '../thunks/equipmentThunk';

const initialState = { 
    loading: false, 
    list_equipment: [], 
    error:''
}

const equipmentSlice= createSlice({
  name: 'list_equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageEquipment.pending, (state) => {
        state.loading = true;
      })
   
      .addCase(manageEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.list_equipment = action.payload;
        state.error = ''
      }
    )
      .addCase(manageEquipment.rejected, (state, action) => {
        state.loading = false
        state.list_equipment = []
        state.error = action.error.message;
      });
  },
});

export default equipmentSlice.reducer;