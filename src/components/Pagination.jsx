import React from "react";

const Pagination = ({
  itemsPerPage,
  currentPage,
  totalUser,
  handlePageChange,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalUser / itemsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <nav>
        <ul>
          {pageNumber.map((page) => (
            <li key={page} className={currentPage === page ? "active" : ""}>
              <button onClick={() => handlePageChange(page)}>{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
