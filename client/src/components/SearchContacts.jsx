import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getContacts } from "../redux/actions/contactActions";

const SearchContacts = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts(query));
  }, [query]);

  return (
    <div className="search-bar">
      <div className="search-box">
        <input
          type="search"
          className="search-input"
          placeholder="search by name or number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default SearchContacts;
