// src/store/features/send/sendSelectors.js
import { createSelector } from "@reduxjs/toolkit";

// sendSlice 루트 선택자
const selectSendState = (state) => state.send;

// 송금 유형(메모이제이션 적용)
export const selectTypeData = createSelector([selectSendState], (send) => ({
  accountNo: send.accountNo,
  sendCurrency: send.sendCurrency,
  receiveCurrency: send.receiveCurrency,
  sendAmount: send.sendAmount,
  regRemType: send.regRemType,
  scheduledDate: send.scheduledDate,
  scheduledDay: send.scheduledDay,
  startedDate: send.startedDate,
  regRemStatus: send.regRemStatus,
}));

// 송금인
export const selectClientData = createSelector([selectSendState], (send) => ({
  clientName: send.clientName,
  clientAddress: send.clientAddress,
  clientCountry: send.clientCountry,
}));

// 수취인 데이터
export const selectRecipientData = createSelector(
  [selectSendState],
  (send) => ({
    recipientName: send.recipientName,
    recipientPhoneCc: send.recipientPhoneCc,
    recipientPhoneNo: send.recipientPhoneNo,
    recipientAddress: send.recipientAddress,
    recipientCountry: send.recipientCountry,
  })
);

// 수취 은행 데이터
export const selectBankData = createSelector([selectSendState], (send) => ({
  recipientBankName: send.recipientBankName,
  recipientBankCode: send.recipientBankCode,
  recipientAccountNo: send.recipientAccountNo,
}));

// ----- 일회성 송금 ------
// 송금 기본 정보 Selector
export const selectSendInfo = createSelector([selectSendState], (send) => ({
  accountId: send.accountId,
  targetAmount: send.targetAmount,
  startDate: send.startDate,
  accountNo: send.accountNo,
  sendCurrency: send.sendCurrency,
}));

// 수취인 정보 Selector
export const selectRecipientInfo = createSelector(
  [selectSendState],
  (send) => ({
    name: send.recipientInfo.name,
    accountNo: send.recipientInfo.accountNo,
    phoneCc: send.recipientInfo.phoneCc,
    phoneNo: send.recipientInfo.phoneNo,
    bankName: send.recipientInfo.bankName,
    bankCode: send.recipientInfo.bankCode,
    country: send.recipientInfo.country,
  })
);

// accountId만 따로 필요할 때
export const selectAccountId = createSelector(
  [selectSendState],
  (send) => send.accountId
);

// 받은 통화(receivedCurrency)만 필요할 때
export const selectReceiveCurrency = createSelector(
  [selectSendState],
  (send) => send.receiveCurrency
);
