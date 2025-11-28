"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import { makeStore } from "../store/store";

export default function Providers({ children, preloadedState }) {
  const [store] = useState(() => makeStore(preloadedState));
  return <Provider store={store}>{children}</Provider>;
}
