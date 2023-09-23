import React from "react";
import "../css/Table.css";

function Table({ data, query }) {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>

        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="3">No result found</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.city}</td>
                <td>{item.countryCode || "No country code"}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Table;
