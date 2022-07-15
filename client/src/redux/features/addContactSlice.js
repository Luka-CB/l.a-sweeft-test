import { createSlice } from "@reduxjs/toolkit";
import { addContact } from "../actions/contactActions";

const initialState = {
  addLoading: false,
  addSuccess: false,
  addError: "",
};

const addContactSlice = createSlice({
  name: "addContactSlice",
  initialState,
  reducers: {
    resetAddContact: (state) => {
      state.addSuccess = false;
      state.addError = "";
    },
  },
  extraReducers: {
    [addContact.pending]: (state) => {
      state.addLoading = true;
    },
    [addContact.fulfilled]: (state) => {
      state.addLoading = false;
      state.addSuccess = true;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.addLoading = false;
      state.addError = payload;
    },
  },
});

export const { resetAddContact } = addContactSlice.actions;

export default addContactSlice.reducer;
