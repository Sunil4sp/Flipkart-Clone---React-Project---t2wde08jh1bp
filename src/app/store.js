import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice";
import { userSlice } from "../feature/users";

export const store = configureStore({
    reducer: {
        allCart: cartSlice,
        allUserData: userSlice
    },
})