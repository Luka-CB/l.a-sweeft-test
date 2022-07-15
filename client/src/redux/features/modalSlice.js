import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    showEditModal: false,
  },
  reducers: {
    editModalHandler: (state, { payload }) => {
      state.showEditModal = payload;
    },
  },
});

export const { editModalHandler } = modalSlice.actions;

export default modalSlice.reducer;
