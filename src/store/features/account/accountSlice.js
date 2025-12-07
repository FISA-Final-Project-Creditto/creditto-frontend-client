import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  balance: 0,

  // ----- 계좌 잔액 합산 조회용 필드 -----
  accountCount: null,
  totalBalance: 0,

  // ----- 계좌 생성용 필드 -----
  accountName: null,
  accountType: null,
  password: null,
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

    // 계좌 생성용 reducer
    // 부분 저장하기 위해 아래와 같이 작성
    setCreateAccount: (state, action) => {
      if (action.payload.accountName !== undefined) {
        state.accountName = action.payload.accountName;
      }
      if (action.payload.accountType !== undefined) {
        state.accountType = action.payload.accountType;
      }
      if (action.payload.password !== undefined) {
        state.password = action.payload.password;
      }
    },

    clearCreateAccount: (state, action) => {
      state.accountName = null;
      state.accountType = null;
      state.password = null;
    },

    // 계좌 목록 상태를 초기화하여 다시 불러오도록 함
    resetAccountStatus: (state) => {
      state.status = "idle";
    },
  },
});

export const {
  setAccounts,
  setAccountsBalance,
  setCreateAccount,
  clearCreateAccount,
  resetAccountStatus,
} = accountSlice.actions;

export default accountSlice.reducer;
