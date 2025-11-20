import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: null,
  nationality: null,
};

export const ocrSlice = createSlice({
  name: "ocr",
  initialState,
  reducers: {
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
    setOcrData: (state, action) => {
      state.imageData = action.payload.imageData;
      state.nationality = action.payload.nationality;
    },
  },
});

export const { setImageData, setOcrData } = ocrSlice.actions;

export default ocrSlice.reducer;
