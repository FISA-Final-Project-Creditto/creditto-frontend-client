'use client'
import { makeStore } from "@/src/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function Providers({children,preloadedState}){
    const storeRef = useRef()
    if(!storeRef.current){
        storeRef.current = makeStore(preloadedState)
    }
    return <Provider store = {storeRef.current}>{children}</Provider>
}