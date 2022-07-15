import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editModalHandler } from "../redux/features/modalSlice";
import { editContact, getContacts } from "../redux/actions/contactActions";
import { resetEditContactState } from "../redux/features/editContactSlice";

const EditModal = ({ data }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const { showEditModal } = useSelector((state) => state.modal);
  const { editLoading, editError, editSuccess } = useSelector(
    (state) => state.editContact
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setNumber(data.number || "");
    }
  }, [data]);

  useEffect(() => {
    if (editError) alert(editError);

    if (editSuccess) {
      dispatch(editModalHandler(false));
      dispatch(getContacts());
    }

    dispatch(resetEditContactState());
  }, [editSuccess, editError, dispatch]);

  const updateHandler = () => {
    dispatch(editContact({ name, number, id: data._id }));
  };

  return (
    <>
      {showEditModal && (
        <div
          className="edit-modal-bg"
          onClick={() => dispatch(editModalHandler(false))}
        >
          <div
            className="edit-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inputs">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="btns">
              <button onClick={updateHandler} id="update">
                {editLoading ? "Updating..." : "Update"}
              </button>
              <button
                id="cancel"
                onClick={() => dispatch(editModalHandler(false))}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
