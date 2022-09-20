import { configureStore } from '@reduxjs/toolkit';
import { coinCapApi } from '../services/coincap';
import modalAddToggleReducer from '../features/modalAddToggleSlice';
import portfolioReducer from '../features/portfolioSlice';
import currencyInfoReducer from '../features/currencyInfoSlice';

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]: coinCapApi.reducer,
    modalAddToggle: modalAddToggleReducer,
    portfolio: portfolioReducer,
    currencyInfo: currencyInfoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinCapApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
