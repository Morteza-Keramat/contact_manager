import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { contactContext } from "./context/contactContext";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";

import "./App.css";
import { confirmAlert } from "react-confirm-alert";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [filteredContact, setFilteredContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  // const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContact(contactsData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []); //you has written here getForceRender
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const createContactForm = async (values) => {
    try {
      setLoading((prevState) => !prevState);
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);

      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContact(allContacts);

        // setContact({});
        setLoading((prevState) => !prevState);
        navigate("/contacts");
      }
    } catch (error) {
      // setErrors(error.inner);
      setLoading((prevState) => !prevState);
    }
  };

  // function for
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1>مطمئن هستید</h1>
            <p>{`مطمئن هستید که میخواهید ${contactFullname} را حذف کنید؟`}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeContact(contactId);
                toast.success("مخاطب حذف شد ! ", {
                  position: "top-center",
                  autoClose: 3000,
                  closeOnClick: true,
                  pauseOnHover: false,
                  theme: "colored",
                });
                onClose();
              }}
            >
              مطمئن هستم
            </button>{" "}
            <button className="btn btn-success" onClick={onClose}>
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  // this funtion delete contact ......................
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContact(updatedContact);

      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContact(allContacts);
      }
    } catch (erro) {
      console.log(erro);
      setContacts(allContacts);
      setFilteredContact(allContacts);
    }
  };
  // end removeContact function ...............................

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContact([...contacts]);

    setFilteredContact(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 1000);

  return (
    <contactContext.Provider
      value={{
        filteredContact,
        loading,
        setLoading,
        contact,
        setContact,
        contacts,
        setContacts,
        groups,
        setFilteredContact,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
};
export default App;
