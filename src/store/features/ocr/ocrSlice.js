import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageData: null, // 외국인등록증 이미지 링크
  nationality: null, // 국적
  alienRegNum: null, // 외국인 등록번호
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
