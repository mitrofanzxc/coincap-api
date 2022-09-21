import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IPortfolio {
  id?: string;
  name?: string;
  symbol?: string;
  priceUsd?: string;
  amount?: number;
}

const localStorageInfo = localStorage.getItem('modalPortfolioInfo') || null;
const initialState: IPortfolio[] = localStorageInfo ? JSON.parse(localStorageInfo) : [];

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCurrencyInfoToPortfolio: (state, action: PayloadAction<IPortfolio>) => {
      state.push(action.payload);
    },
    removeCurrencyInfoFromPortfolio: (state, action: PayloadAction<string>) => {
      state = state.filter(({ id }) => id === action.payload);
    },
  },
});

export const { addCurrencyInfoToPortfolio, removeCurrencyInfoFromPortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
