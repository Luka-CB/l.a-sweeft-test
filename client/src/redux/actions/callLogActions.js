import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCallLog = createAsyncThunk(
  "CREATE_CALL_LOG",
  async (contact, thunkAPI) => {
    const {
      auth: { user },
    } = thunkAPI.getState();

    try {
      await axios.post("/api/calllogs/create", contact, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.errorMsg);
    }
  }
);
