import React, { useState } from "react";
import TransactionsCard from "./TransactionsCard/TransactionsCard";
import style from "./RecentTransactions.module.css";
import Pagination from "./Pagination/Pagination";

const RecentTransactions = ({ expenseList, handleDelete, handleEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sortedExpenseList = expenseList.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const totalPages = Math.ceil(sortedExpenseList.length / 3);
  const handlePageChange = (changeType) => {
    if (changeType === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    if (changeType === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const getItemsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    return sortedExpenseList.slice(startIndex, endIndex);
  };

  return (
    <div className={style.RecentTransactionsConWraper}>
      <h1>Recent Transactions</h1>
      <div className={style.RecentTransactionsCon}>
        <div className={style.RecentTransactionsDetailsCon}>
          {getItemsForCurrentPage().map((item, index) => (
            <TransactionsCard
              key={index}
              expense={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>

        <Pagination currentPage={currentPage} handlePage={handlePageChange} />
      </div>
    </div>
  );
};

export default RecentTransactions;
