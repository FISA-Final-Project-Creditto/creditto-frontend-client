import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regRemId: null,
  recipientName: null,
  recipientAccountNo: null,
  detailedHistory: [],
};

export const sendHistorySlice = createSlice({
  name: "sendHistory",
  initialState,
  reducers: {
    // 정기 송금 ID, 수취인, 수취계좌번호
    setSendHistoryData: (state, action) => {
      Object.assign(state, action.payload);
    },

    // 등록한 정기 해외 송금 내역 리스트
    setDetailData: (state, action) => {
      state.detailedHistory = action.payload;
    },
  },
});

export const { setSendHistoryData, setDetailData } = sendHistorySlice.actions;

export default sendHistorySlice.reducer;
