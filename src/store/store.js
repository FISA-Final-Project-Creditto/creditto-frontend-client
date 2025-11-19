import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import ocrReducer from "./features/ocr/ocrSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ocr: ocrReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
