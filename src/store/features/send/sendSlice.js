import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null,
  receivedCurrency: null,
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
  },
});

export const { setSelectedCountry, clearReceivedCountry, setReceivedCurrency } =
  sendSlice.actions;

export default sendSlice.reducer;
