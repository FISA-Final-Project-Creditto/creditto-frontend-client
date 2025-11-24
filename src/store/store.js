import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter/counterSlice";
import ocr from "./features/ocr/ocrSlice";
import user from "./features/signup/userSlice";
import send from "./features/send/sendSlice"; // New import
import simplepw from "./features/simplepw/simplepwSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      counter,
      ocr,
      user,
      simplepw,
      send, // New reducer
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
