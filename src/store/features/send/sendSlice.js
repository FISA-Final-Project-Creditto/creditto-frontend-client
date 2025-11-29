import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null,
  receivedCurrency: null,
  targetAmount: null,
  startDate: null,
  recipientInfo: {
    name: null,
    accountNo: null,
    phoneCc: null,
    phoneNo: null,
    bankName: null,
    bankCode: null,
  },
};

export const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {
    // 선택된 국가
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },

    // 수취 통화 코드
    setReceivedCurrency: (state, action) => {
      state.receivedCurrency = action.payload;
    },

    // 송금 정보 (금액, 시작일)
    setSendInfo: (state, action) => {
      state.targetAmount = action.payload.targetAmount;
      state.startDate = action.payload.startDate;
    },

    // 수취인 정보 (이름, 계좌번호, 전화번호)
    setRecipientInfo: (state, action) => {
      state.recipientInfo = { ...state.recipientInfo, ...action.payload };
    },

  },
});

export const {
  setSelectedCountry,
  clearSelectedCountry,
  setReceivedCurrency,
  setSendInfo,
  setRecipientInfo,

} = sendSlice.actions;

export default sendSlice.reducer;
