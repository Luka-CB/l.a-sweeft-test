import { configureStore } from "@reduxjs/toolkit";
import toggleAuthReducer from "./features/toggleAuthSlice";
import authReducer from "./features/authSlice";
import addContactReducer from "./features/addContactSlice";
import getContactsReducer from "./features/getContactSlice";
import editContactReducer from "./features/editContactSlice";
import deleteContactReducer from "./features/deleteContactSlice";
import callLogReducer from "./features/callLogSlice";
import modalReducer from "./features/modalSlice";

const store = configureStore({
  reducer: {
    toggleAuth: toggleAuthReducer,
    auth: authReducer,
    addContact: addContactReducer,
    getContacts: getContactsReducer,
    editContact: editContactReducer,
    deleteContact: deleteContactReducer,
    callLog: callLogReducer,
    modal: modalReducer,
  },
});

export default store;
