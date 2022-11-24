import { configureStore } from "@reduxjs/toolkit";
import managementSlice from "./slices/slice-manage";
import basketSlice from "./slices/slice-basket";

const store = configureStore({
    reducer: {
        manage: managementSlice,
        basket: basketSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>; // ReturnType is generic
export type AppDispatch = typeof store.dispatch;