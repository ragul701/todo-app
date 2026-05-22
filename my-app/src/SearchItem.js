import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search Items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />
    </form>
  );
};

export default SearchItem;