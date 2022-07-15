import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authActions";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const initialState = {
  user: userFromStorage,
  regError: "",
  loginError: "",
  registerLoading: false,
  registerSuccess: false,
  loginLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetRegSuccess(state) {
      state.registerSuccess = false;
    },
  },
  extraReducers: {
    // Register User Reducer
    [registerUser.pending]: (state) => {
      state.registerLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.registerLoading = false;
      state.registerSuccess = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerLoading = false;
      state.regError = payload;
    },

    // Login User Reducer
    [loginUser.pending]: (state) => {
      state.loginLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loginLoading = false;
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loginLoading = false;
      state.loginError = payload;
    },
  },
});

export const { resetRegSuccess } = authSlice.actions;

export default authSlice.reducer;
