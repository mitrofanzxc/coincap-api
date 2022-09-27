import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../utils';

export interface IPortfolio {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  amount: number;
}

const initialState: IPortfolio[] = getLocalStorage('modalPortfolioInfo')
  ? getLocalStorage('modalPortfolioInfo')
  : [];

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCurrencyInfoToPortfolio: (state, action: PayloadAction<IPortfolio>) => {
      const isCurrencyExist = state.find(({ id }) => id === action.payload.id);

      if (isCurrencyExist) {
        isCurrencyExist.amount += action.payload.amount;
        return state;
      }

      state.push(action.payload);
    },
    removeCurrencyInfoFromPortfolio: (state, action: PayloadAction<string>) => {
      return state.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addCurrencyInfoToPortfolio, removeCurrencyInfoFromPortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
