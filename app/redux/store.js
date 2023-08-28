"use client"
import { configureStore } from "@reduxjs/toolkit";
import connectWalletReducer from "./feature/connect-wallet-slice"
import activeComponentReducer from "./feature/activeComponentSlice"
import fetchProposalsReducer from "./feature/fetchProposalsSlice"
import selectedChainReducer from "./feature/selectedChainSlice";

export const store = configureStore({
    reducer: {
        connectWalletReducer,
        activeComponent:activeComponentReducer,
        fetchProposalsReducer,
        selectedChainReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
