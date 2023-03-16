import React from "react";
import Search from "../assets/search.svg";

const SearchBox = ({ onSearchTextChange }) => {
  return (
    <div className="bg-transparent border-2 w-68 h-12 rounded-sm ml-auto flex items-center">
      <img src={Search} alt="search icon" className="w-4 h-4 absolute ml-2" />
      <input
        type="text"
        className="bg-transparent h-12 text-sm font-medium pl-8 outline-none text-black"
        placeholder="Search by Job Role & Skills"
        style={{ width: "300px" }}
        onChange={(e) => {
          onSearchTextChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
