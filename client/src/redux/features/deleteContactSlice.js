import { createSlice } from "@reduxjs/toolkit";
import { deleteContact } from "../actions/contactActions";

const initialState = {
  delLoading: false,
  delSuccess: false,
};

const deleteContactSlice = createSlice({
  name: "deleteContactSlice",
  initialState,
  reducers: {
    resetdeleteContactState: (state) => initialState,
  },
  extraReducers: {
    [deleteContact.pending]: (state) => {
      state.delLoading = true;
    },
    [deleteContact.fulfilled]: (state) => {
      state.delLoading = false;
      state.delSuccess = true;
    },
    [deleteContact.rejected]: (state) => {
      state.delLoading = false;
    },
  },
});

export const { resetdeleteContactState } = deleteContactSlice.actions;

export default deleteContactSlice.reducer;
