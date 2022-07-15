import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import decoder from "jwt-decode";

export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (user, thunkAPI) => {
    try {
      await axios.post("/api/users/register", user, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorMsg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "LOGIN_USER",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/login", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (data) {
        const decoded = decoder(data.token);
        const user = {
          id: decoded.id,
          username: decoded.username,
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(user));

        return user;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorMsg);
    }
  }
);
