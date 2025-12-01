import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: null,
};

export const sendModeSlice = createSlice({
  name: "sendMode",
  initialState,
  reducers: {
    // 송금 방식
    setModeData: (state, action) => {
      state.mode = action.payload;
    },

    clearModeData: (state, action) => {
      state.mode = null;
    },
  },
});

export const { setModeData, clearModeData } = sendModeSlice.actions;

export default sendModeSlice.reducer;
