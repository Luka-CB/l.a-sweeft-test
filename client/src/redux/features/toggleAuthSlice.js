import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: true,
  login: false,
};

const toggleAuthSlice = createSlice({
  name: "toggleAuth",
  initialState,
  reducers: {
    toggleRegister: (state, { payload }) => {
      if (payload === true) {
        state.register = true;
        state.login = false;
      } else {
        state.register = false;
        state.login = true;
      }
    },

    toggleLogin: (state, { payload }) => {
      if (payload === true) {
        state.login = true;
        state.register = false;
      } else {
        state.login = false;
        state.register = true;
      }
    },
  },
});

export const { toggleLogin, toggleRegister } = toggleAuthSlice.actions;

export default toggleAuthSlice.reducer;
