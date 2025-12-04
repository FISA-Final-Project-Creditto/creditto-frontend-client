import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null, // 선택 국가

  // ----- 송금 유형 -----
  accountNo: null, // 출금 계좌번호
  accountId: null, // 비밀번호 동일 여부를 위해 사용
  sendCurrency: null, // 송금 통화
  receiveCurrency: null, // 수취 통화
  sendAmount: null, // 송금 금액(외화), 일회 송금에도 사용
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

  // ----- 일회성 송금 데이터 -----
  accountNo: null, // 송금 계좌
  accountId: null, // 송금 계좌 아이디
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
    country: null,
  },
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

    // ---------- 일회성 송금 ----------
    // 수취 통화 코드
    setReceiveCurrency: (state, action) => {
      state.receiveCurrency = action.payload;
    },

    // 송금 정보 (금액, 시작일, 계좌 번호 및 아이디)
    setSendInfo: (state, action) => {
      state.targetAmount = action.payload.targetAmount;
      state.startDate = action.payload.startDate;
      state.accountNo = action.payload.accountNo;
      state.accountId = action.payload.accountId;
      state.sendCurrency = action.payload.sendCurrency;
    },

    // 수취인 정보 (이름, 계좌번호, 전화번호)
    setRecipientInfo: (state, action) => {
      state.recipientInfo = { ...state.recipientInfo, ...action.payload };
    },
  },
});

export const {
  setCountryData,
  setTypeData,
  setClientData,
  setRecipientData,
  setBankData,
  setReceiveCurrency,
  setSendInfo,
  setRecipientInfo,
} = sendSlice.actions;

export default sendSlice.reducer;
