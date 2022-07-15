import { createSlice } from "@reduxjs/toolkit";
import { editContact } from "../actions/contactActions";

const initialState = {
  editLoading: false,
  editSuccess: false,
  editError: "",
};

const editContactSlice = createSlice({
  name: "editContactSlice",
  initialState,
  reducers: {
    resetEditContactState: (state) => initialState,
  },
  extraReducers: {
    [editContact.pending]: (state) => {
      state.editLoading = true;
    },
    [editContact.fulfilled]: (state) => {
      state.editLoading = false;
      state.editSuccess = true;
    },
    [editContact.rejected]: (state, { payload }) => {
      state.editLoading = false;
      state.editError = payload;
    },
  },
});

export const { resetEditContactState } = editContactSlice.actions;

export default editContactSlice.reducer;
