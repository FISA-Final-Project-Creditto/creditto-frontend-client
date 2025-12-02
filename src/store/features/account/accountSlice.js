import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  balance: 0,

  // ----- 계좌 잔액 합산 조회용 필드 -----
  accountCount: null,
  totalBalance: 0,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
      state.status = "succeeded";
    },

    // 계좌 잔액 합산 조회용 reducer
    setAccountsBalance: (state, action) => {
      state.accountCount = action.payload.accountCount;
      state.totalBalance = action.payload.balance;
    },
  },
});

export const { setAccounts, setAccountsBalance } = accountSlice.actions;

export default accountSlice.reducer;
