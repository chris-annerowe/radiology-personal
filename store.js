import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './ui/reducers/appointmentSlice';

const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
});

export default store;