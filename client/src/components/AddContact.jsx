import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, getContacts } from "../redux/actions/contactActions";
import { resetAddContact } from "../redux/features/addContactSlice";

const AddContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const { addLoading, addSuccess, addError } = useSelector(
    (state) => state.addContact
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (addError) {
      alert(addError);
    }

    if (addSuccess) {
      setName("");
      setNumber("");
      dispatch(getContacts());
    }
    dispatch(resetAddContact());
  }, [addError, addSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addContact({ name, number }));
  };

  return (
    <div className="add-contact-container">
      <h3 onClick={() => dispatch(addContact())} id="text">
        Add New Contact
      </h3>
      <form onSubmit={submitHandler}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button className="add-btn">{addLoading ? "Adding..." : "Add"}</button>
      </form>
    </div>
  );
};

export default AddContact;
