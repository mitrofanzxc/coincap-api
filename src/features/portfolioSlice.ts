import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAssets } from '../services/coincap.interface';

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
    updatePortfolio: (state, action: PayloadAction<IAssets[] | undefined>) => {
      const tempState = [...state.portfolioList];

      if (tempState.length && action.payload?.length) {
        for (let i = 0; i < tempState.length; i += 1) {
          tempState[i].priceUsd = action.payload[i].priceUsd
            ? action.payload[i].priceUsd
            : tempState[i].priceUsd;
        }

        state.portfolioList = tempState;
      }
    },
  },
});

export const {
  addCurrencyInfoToPortfolio,
  removeCurrencyInfoFromPortfolio,
  handleTotalPortfolio,
  updatePortfolio,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
