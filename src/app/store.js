import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";

export const store = configureStore({
    reducer: {
        allCart: cartSlice,

    },
})