import { configureStore } from "@reduxjs/toolkit";
import counter from './features/counter/counterSlice'
export function makeStore(preloadedState){
    return configureStore({
        reducer:  {
            counter
        },
        preloadedState,
        devTools : process.env.NODE_ENV !== 'production'
    })
}