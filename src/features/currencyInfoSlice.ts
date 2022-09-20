import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ICurrencyInfoState {
  id?: string;
  name?: string;
  symbol?: string;
  amount?: number;
}

const initialState: ICurrencyInfoState = {};

export const currencyInfoSlice = createSlice({
  name: 'currencyInfo',
  initialState,
  reducers: {
    addCurrencyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    addCurrencyName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addCurrencySymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    addCurrencyAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
  },
});

export const { addCurrencyId, addCurrencyName, addCurrencySymbol, addCurrencyAmount } =
  currencyInfoSlice.actions;
export default currencyInfoSlice.reducer;
