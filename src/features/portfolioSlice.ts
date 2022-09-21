import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IPortfolio {
  id?: string;
  name?: string;
  symbol?: string;
  priceUsd?: string;
  amount?: number;
}

const initialState: IPortfolio[] = [];

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCurrencyInfoToPortfolio: (state, action: PayloadAction<IPortfolio>) => {
      state.push(action.payload);
    },
    parseCurrencyInfoToPortfolio: (state, action: PayloadAction<IPortfolio[]>) => {
      state = [...action.payload];
    },
  },
});

export const { addCurrencyInfoToPortfolio, parseCurrencyInfoToPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
