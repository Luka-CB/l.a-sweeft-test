import { createSlice } from "@reduxjs/toolkit";
import { createCallLog } from "../actions/callLogActions";

const initialState = {
  callLoading: false,
  callSuccess: false,
};

const callLogSlice = createSlice({
  name: "callLogSlice",
  initialState,
  reducers: {
    resetCallLogState: (state) => initialState,
  },
  extraReducers: {
    [createCallLog.pending]: (state) => {
      state.callLoading = true;
    },
    [createCallLog.fulfilled]: (state) => {
      state.callLoading = false;
      state.callSuccess = true;
    },
    [createCallLog.rejected]: (state) => {
      state.callLoading = false;
    },
  },
});

export const { resetCallLogState } = callLogSlice.actions;

export default callLogSlice.reducer;
