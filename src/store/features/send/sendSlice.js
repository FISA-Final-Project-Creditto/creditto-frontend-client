import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null, // 선택 국가

  // ----- 송금 유형 -----
  accountNo: null, // 출금 계좌번호
  sendCurrency: null, // 송금 통화
  receiveCurrency: null, // 수취 통화
  sendAmount: null, // 송금 금액(외화)
  regRemType: null, // 송금 주기
  scheduledDate: null, // 정기 송금일(매일)
  scheduledDay: null, // 정기 송금일(매주)
  startedDate: null, // 송금 시작일

  // ----- 송금인 -----
  clientName: null, // 송금인 이름
  clientAddress: null, // 송금인 주소
  clientCountry: null, // 송금인 국적

  // ----- 수취인 -----
  recipientName: null, // 수취인 이름
  recipientPhoneCc: null, // 수취인 전화코드
  recipientPhoneNo: null, // 수취인 전화번호
  recipientAddress: null, // 수취인 주소
  recipientCountry: null, // 수취인 국적

  // ----- 수취 은행 -----
  recipientBankName: null, // 수취 은행명
  recipientBankCode: null, // 수취 은행 코드
  recipientAccountNo: null, // 수취 은행 계좌
};

export const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {
    // 선택된 국가
    setCountryData: (state, action) => {
      state.selectedCountry = action.payload;
    },

    // 송금 유형
    setTypeData: (state, action) => {
      Object.assign(state, action.payload);
    },

    // 송금인
    setClientData: (state, action) => {
      Object.assign(state, action.payload);
    },

    // 수취인
    setRecipientData: (state, action) => {
      Object.assign(state, action.payload);
    },

    // 수취 은행
    setBankData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setCountryData,
  setTypeData,
  setClientData,
  setRecipientData,
  setBankData,
} = sendSlice.actions;

export default sendSlice.reducer;
