import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: null,
  receiveCurrency: null,
};

export const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
    },
    setTypeData: (state, action) => {
      state.receiveCurrency = action.payload; // 수취 통화 코드 저장
    },
  },
});

export const { setSelectedCountry, clearSelectedCountry, setTypeData } =
  sendSlice.actions;

export default sendSlice.reducer;
