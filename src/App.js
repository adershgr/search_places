import React, { useState, useEffect } from "react";
import "./css/App.css";
import MySearchBox from "./components/MySearchBox";

function App() {
  const [searchedQuery, setSearchedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    setSearchedQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?q=${searchedQuery}&page=${currentPage}`, {
        method: 'GET',
        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
        },
      });
      const data = await response.json();
    };

    if (searchedQuery) {
      fetchData();
    }
  }, [searchedQuery, currentPage]);

  return (
    <div className="app">
      <h1 className="heading">City Search</h1>
      <MySearchBox onSearch={handleSearch} />
    </div>
  );
}

export default App;
