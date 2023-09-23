import React, { useState, useRef, useEffect } from "react";
import "../css/SearchBox.css";

function SearchBox({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.keyCode === 191) {
        searchInputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search cities"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
        ref={searchInputRef}
      />
    </div>
    );
}

export default SearchBox;