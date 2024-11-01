import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    address: "",
    phoneNumber: "",
    userName: "",
    email: "",
    isLoggedIn: false, // To track login status
  };

export const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
        const { name, address, phoneNumber, userName, email } = action.payload;
        state.name = name;
        state.address = address;
        state.phoneNumber = phoneNumber;
        state.userName  = userName;
        state.email = email;
        },
        setLoginStatus: (state, action) => {
        state.isLoggedIn = action.payload; // Set login status
        },
        clearUserDetails: (state) => {
        state.name = "";
        state.address = "";
        state.phoneNumber = "";
        state.userName = "";
        state.isLoggedIn = false; // Optionally clear login status
        },
    },
});

export const { setUserDetails, setLoginStatus, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
