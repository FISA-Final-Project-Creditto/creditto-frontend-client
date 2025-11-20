import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter/counterSlice";
import ocr from "./features/ocr/ocrSlice";
import user from "./features/signup/userSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      counter,
      ocr,
      user,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
