import React from "react";
import "../css/Pagination.css";

function Pagination({
  handleLimitChange,
  limit,
  totalPages,
  pagination,
  currentPage,
  handlePageChange,
}) {
  const iterationArray = Array.from({ length: totalPages });

  return (
    <div className="pagination-container">
      <p>
        <b>Enter number of records to display per page:</b>
      </p>
      <input
        className="page-input"
        type="number"
        placeholder="Page numbers"
        onChange={handleLimitChange}
      />
      <br />
      {pagination && (
        <p>
          <b>Pages:</b>
        </p>
      )}
      {pagination &&
        iterationArray.map((elem, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
}

export default Pagination;