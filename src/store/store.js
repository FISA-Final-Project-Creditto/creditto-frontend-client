import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter/counterSlice";
import ocr from "./features/ocr/ocrSlice";
import user from "./features/signup/userSlice";
import send from "./features/send/sendSlice"; // New import
import simplepw from "./features/simplepw/simplepwSlice";
import account from "./features/account/accountSlice"

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      counter,
      ocr,
      user,
      send,
      simplepw,
      account

    },
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
