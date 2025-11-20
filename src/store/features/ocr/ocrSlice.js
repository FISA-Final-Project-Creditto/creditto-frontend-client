import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: null,
  nationality: null,
  countryCode: null,
};

export const ocrSlice = createSlice({
  name: "ocr",
  initialState,
  reducers: {
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
    setOcrData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setImageData, setOcrData } = ocrSlice.actions;

export default ocrSlice.reducer;
