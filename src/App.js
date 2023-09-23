import React, { useState, useEffect } from "react";
import "./css/App.css";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { fetchCities } from "./Api"; 

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setPagination(false);
      return;
    }
    setSearchedQuery(query);
    setPagination(true);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchCities({
        countryIds: "IN",
        namePrefix: searchedQuery,
        offset: (currentPage - 1) * limit,
        limit: limit,
      });

      const totalPages = Math.ceil(data.metadata.totalCount / limit);
      setTotalPages(totalPages);
      setSearchResults(data.data);
      setError(null);
    } catch (error) {
      setError("Something went wrong... Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    if (!isNaN(newLimit) && newLimit >= 1 && newLimit <= 10) {
      setLimit(newLimit);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (searchedQuery) {
      fetchData();
    }
  }, [searchedQuery, limit, currentPage]);

  return (
    <div className="App">
      <h1 className="heading">Search Places</h1>
      <SearchBox onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Table data={searchResults} query={searchedQuery} />
          <Pagination
            handleLimitChange={handleLimitChange}
            totalPages={totalPages}
            limit={limit}
            pagination={pagination}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
