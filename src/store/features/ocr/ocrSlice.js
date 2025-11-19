import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: null,
};

export const ocrSlice = createSlice({
  name: "ocr",
  initialState,
  reducers: {
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
  },
});

export const { setImageData } = ocrSlice.actions;

export default ocrSlice.reducer;
