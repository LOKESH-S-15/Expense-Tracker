import React from "react";
import style from "./Pagination.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const Pagination = ({ currentPage, handlePage }) => {
  return (
    <div className={style.PaginationCon}>
      <button
        onClick={(e) => {
          handlePage("prev");
        }}
        className={style.PaginationBtn}
      >
        <FaChevronLeft />
      </button>
      <p className={style.PaginationNum}>{currentPage}</p>
      <button
        onClick={(e) => {
          handlePage("next");
        }}
        className={style.PaginationBtn}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
