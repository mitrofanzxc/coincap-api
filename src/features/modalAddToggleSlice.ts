import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IModalAddToggle {
  value: boolean;
}

const initialState: IModalAddToggle = {
  value: false,
};

export const modalAddToggleSlice = createSlice({
  name: 'modalAddToggle',
  initialState,
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
    toggleByAmount: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { open, close, toggleByAmount } = modalAddToggleSlice.actions;
export default modalAddToggleSlice.reducer;
