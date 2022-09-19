import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ModalAddToggleState {
  value: boolean;
}

const initialState: ModalAddToggleState = {
  value: true,
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
