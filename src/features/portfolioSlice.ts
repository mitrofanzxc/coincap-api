import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IPortfolio {
  id?: string;
  name?: string;
  symbol?: string;
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
  },
});

export const { addCurrencyInfoToPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
