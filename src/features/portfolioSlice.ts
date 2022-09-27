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

export interface IInitialState {
  portfolioList: IPortfolio[];
  total: number;
}

const currentPortfolioList = localStorage.getItem('currentPortfolioList') || null;
const currentPortfolioTotal = localStorage.getItem('currentPortfolioTotal') || null;

const initialState: IInitialState = {
  portfolioList: currentPortfolioList ? JSON.parse(currentPortfolioList) : [],
  total: currentPortfolioTotal ? JSON.parse(currentPortfolioTotal) : 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCurrencyInfoToPortfolio: (state, action: PayloadAction<IPortfolio>) => {
      const isCurrencyExist = state.portfolioList.find(({ id }) => id === action.payload.id);

      if (isCurrencyExist) {
        isCurrencyExist.amount += action.payload.amount;
        return state;
      } else {
        state.portfolioList.push(action.payload);
      }
    },
    removeCurrencyInfoFromPortfolio: (state, action: PayloadAction<string>) => {
      state.portfolioList = state.portfolioList.filter(({ id }) => id !== action.payload);
    },
    handleTotalPortfolio: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { addCurrencyInfoToPortfolio, removeCurrencyInfoFromPortfolio, handleTotalPortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
