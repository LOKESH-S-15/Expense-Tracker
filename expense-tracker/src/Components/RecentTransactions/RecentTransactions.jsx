import React from "react";
import TransactionsCard from "./TransactionsCard/TransactionsCard";

const RecentTransactions = ({ expenseList, handleDelete, handleEdit }) => {
  const sortedExpenseList = expenseList.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <div>
      <h1>Recent Transactions</h1>
      <div>
        {sortedExpenseList.map((item, index) => (
          <TransactionsCard
            key={index}
            expense={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
