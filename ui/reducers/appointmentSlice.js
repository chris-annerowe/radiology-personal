// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointment: {},
  },
  reducers: {
    updateAppt: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { updateAppt } = appointmentSlice.actions;
export default appointmentSlice.reducer;