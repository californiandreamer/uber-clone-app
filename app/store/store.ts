import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../slices/navigationReducer';

export const store = configureStore({
  reducer: navigationReducer,
});

export type RootState = ReturnType<typeof store.getState>;
