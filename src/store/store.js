import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter/counterSlice";
import ocr from "./features/ocr/ocrSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      counter,
      ocr,

    },
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}