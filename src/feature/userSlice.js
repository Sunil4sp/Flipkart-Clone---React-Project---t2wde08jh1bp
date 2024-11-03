import { createSlice } from "@reduxjs/toolkit";

const getUserData = () => {

    const localUserData = localStorage.getItem("userProfile");
    if (!localUserData) return [];
    try {
      const parsedData = JSON.parse(localUserData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      return [];
    }
  };

const initialState = {
    user: getUserData(),
    name: "",
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
        const { name, phoneNumber, userName, email } = action.payload;
        state.name = name;
        state.phoneNumber = phoneNumber;
        state.userName  = userName;
        state.email = email;
        },
        setLoginStatus: (state, action) => {
            /* const { isLoggedIn } = action.payload; */
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

export const { 
    setUserDetails, 
    setLoginStatus, 
    clearUserDetails, 
} = userSlice.actions;

export default userSlice.reducer;
