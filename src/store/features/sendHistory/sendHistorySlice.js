import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regRemId: null,
  recipientName: null,
  recipientAccountNo: null,
};

export const sendHistorySlice = createSlice({
  name: "sendHistory",
  initialState,
  reducers: {
    // 정기 송금 ID, 수취인, 수취계좌번호
    setSendHistoryData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSendHistoryData } = sendHistorySlice.actions;

export default sendHistorySlice.reducer;
