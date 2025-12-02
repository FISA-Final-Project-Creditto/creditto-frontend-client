// src/store/consentSlice.js (경로는 프로젝트 구조에 맞게)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checked: {}, // { [consentId]: true/false }
};

const consentSlice = createSlice({
  name: "consent",
  initialState,
  reducers: {
    setConsentChecked: (state, action) => {
      const { id, checked } = action.payload;
      state.checked[id] = checked;
    },
  },
});

export const { setConsentChecked } = consentSlice.actions;
export default consentSlice.reducer;
