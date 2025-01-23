import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: localStorage?.getItem("network-userData") ? JSON.parse(localStorage?.getItem("network-userData") || "") : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserCredentials: (state, action) => {
            state.userData = action.payload;

            localStorage.setItem("network-userData", JSON.stringify(action.payload));
        },

        userLogout: (state) => {
            state.userData = null;
            localStorage.removeItem("network-userData");
        },
    },
});



export const {userLogout,setUserCredentials} = authSlice.actions

export default authSlice.reducer;