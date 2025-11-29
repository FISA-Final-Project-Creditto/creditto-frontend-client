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
