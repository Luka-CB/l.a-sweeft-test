import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editModalHandler } from "../redux/features/modalSlice";
import EditModal from "./EditModal";
import { deleteContact, getContacts } from "../redux/actions/contactActions";
import { createCallLog } from "../redux/actions/callLogActions";
import { resetCallLogState } from "../redux/features/callLogSlice";
import { resetdeleteContactState } from "../redux/features/deleteContactSlice";

const ContactList = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [index, setIndex] = useState(null);
  const [contactData, setContactData] = useState({});
  const [contactName, setContactName] = useState("");

  const { contacts } = useSelector((state) => state.getContacts);
  const { delSuccess } = useSelector((state) => state.deleteContact);
  const { callSuccess } = useSelector((state) => state.callLog);

  const dispatch = useDispatch();

  useEffect(() => {
    if (delSuccess) {
      dispatch(getContacts());
      dispatch(resetdeleteContactState());
    }
  }, [delSuccess]);

  useEffect(() => {
    if (callSuccess) {
      alert(`You called ${contactName} successfully!`);
      dispatch(resetCallLogState());
    }
  }, [callSuccess]);

  const deleteHandler = (id) => {
    dispatch(deleteContact(id));
  };

  const createCallLogHandler = (info) => {
    setContactName(info.name);
    dispatch(createCallLog({ name: info.name, number: info.number }));
  };

  return (
    <div className="contact-list-container">
      {contacts?.map((contact, i) => (
        <div
          className="list"
          key={contact._id}
          onMouseEnter={() => {
            setShowConfig(true);
            setIndex(i);
          }}
          onMouseLeave={() => setShowConfig(false)}
        >
          <div className="contact-info">
            <h3 className="name">{contact.name}</h3>
            <h4 className="number">{contact.number}</h4>
            <div
              className="phone-icon"
              onClick={() =>
                createCallLogHandler({
                  name: contact.name,
                  number: contact.number,
                })
              }
            >
              <i className="fa-solid fa-phone"></i>
            </div>
          </div>
          {showConfig && index === i && (
            <div className="config">
              <i
                onClick={() => {
                  dispatch(editModalHandler(true));
                  setContactData(contact);
                }}
                className="fa-solid fa-pencil"
                title="Edit Contact"
              ></i>
              <i
                onClick={() => deleteHandler(contact._id)}
                className="fa-solid fa-rectangle-xmark"
                title="Remove Contact"
              ></i>
            </div>
          )}
        </div>
      ))}

      <EditModal data={contactData} />
    </div>
  );
};

export default ContactList;
