import { configureStore } from '@reduxjs/toolkit';
import { coinCapApi } from '../services/coincap';
import modalAddToggleReducer from '../features/modalAddToggleSlice';

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]: coinCapApi.reducer,
    modalAddToggle: modalAddToggleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinCapApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
