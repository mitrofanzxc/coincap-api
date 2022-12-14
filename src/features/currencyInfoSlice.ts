import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ICurrencyInfoState {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  amount: number;
}

const initialState: ICurrencyInfoState = {
  id: '',
  name: '',
  symbol: '',
  priceUsd: '',
  amount: 0,
};

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
    addCurrencyPriceUsd: (state, action: PayloadAction<string>) => {
      state.priceUsd = action.payload;
    },
    addCurrencyAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    addCurrencyInfo: (state, action: PayloadAction<ICurrencyInfoState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  addCurrencyId,
  addCurrencyName,
  addCurrencySymbol,
  addCurrencyPriceUsd,
  addCurrencyAmount,
  addCurrencyInfo,
} = currencyInfoSlice.actions;
export default currencyInfoSlice.reducer;
