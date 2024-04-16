import { createContext } from "react";
export const contactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContact: () => {},
  contacts: {},
  setContacts: () => {},
  filteredContact: [],
  setFilteredContact: () => {},
  contactQuary: {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
