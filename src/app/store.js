import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";
import userSlice from "../feature/userSlice";
import orderSlice from "../feature/orderSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        order: orderSlice
    }
})