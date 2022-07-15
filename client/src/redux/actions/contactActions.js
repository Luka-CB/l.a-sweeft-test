import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addContact = createAsyncThunk(
  "ADD_CONTACT",
  async (contact, thunkAPI) => {
    const {
      auth: { user },
    } = thunkAPI.getState();

    try {
      await axios.post("/api/contacts/add", contact, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorMsg);
    }
  }
);

export const getContacts = createAsyncThunk(
  "GET_CONTACT",
  async (query = "", thunkAPI) => {
    const {
      auth: { user },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(`/api/contacts/get?q=${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (data) {
        return data;
      }
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.errorMsg);
    }
  }
);

export const editContact = createAsyncThunk(
  "EDIT_CONTACT",
  async (contact, thunkAPI) => {
    const {
      auth: { user },
    } = thunkAPI.getState();

    try {
      await axios.put(`/api/contacts/edit/${contact.id}`, contact, {
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

export const deleteContact = createAsyncThunk(
  "DELETE_CONTACT",
  async (contactId, thunkAPI) => {
    const {
      auth: { user },
    } = thunkAPI.getState();

    try {
      await axios.delete(`/api/contacts/delete/${contactId}`, {
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
