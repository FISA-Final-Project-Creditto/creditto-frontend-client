import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  balance: 0,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { setAccounts } = accountSlice.actions;

export default accountSlice.reducer;
