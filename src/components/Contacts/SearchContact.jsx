import { PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";

const SearchContact = () => {
  const { contactSearch } = useContext(contactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        className="form-control"
        placeholder="جستجوی مخاطب"
        onChange={(event) => contactSearch(event.target.value)}
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
