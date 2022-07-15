import { createSlice } from "@reduxjs/toolkit";
import { getContacts } from "../actions/contactActions";

const initialState = {
  contacts: [],
  getLoading: false,
};

const getContactsSlice = createSlice({
  name: "getContactsSlice",
  initialState,
  extraReducers: {
    [getContacts.pending]: (state) => {
      state.getLoading = true;
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.contacts = payload;
    },
    [getContacts.rejected]: (state) => {
      state.getLoading = false;
    },
  },
});

export default getContactsSlice.reducer;
