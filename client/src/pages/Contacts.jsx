import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContact from "../components/AddContact";
import ContactList from "../components/ContactList";
import SearchContacts from "../components/SearchContacts";
import { getContacts } from "../redux/actions/contactActions";

const Contacts = () => {
  const { user } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.getContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const signoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="contacts-container">
      <section className="header">
        <SearchContacts />
        <div className="user-info">
          <h3 className="user-name">{user?.username}</h3>
          <h5 className="logout" onClick={signoutHandler}>
            sign out
          </h5>
        </div>
      </section>
      <section className="body">
        {contacts?.length === 0 && <p id="no-contact">No Contacts!</p>}
        <AddContact />
        <hr />
        <ContactList />
      </section>
    </div>
  );
};

export default Contacts;
