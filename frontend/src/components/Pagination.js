import React from "react";

const Pagination = ({productsPerPage, totalProducts, currentPage, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-3">
      <ul class="pagination justify-content-center mx-auto">
        {pageNumbers.map(number => (
          <li class={`page-item ${currentPage == number ? "active" : ""} `}>
            <button onClick={() => paginate(number)} className="page-link shadow-none">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
