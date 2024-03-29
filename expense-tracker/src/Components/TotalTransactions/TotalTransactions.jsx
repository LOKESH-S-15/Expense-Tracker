import React from "react";
import style from "./TotalTransactions.module.css";
import TotalExpenseCategory from "./TotalExpenseCategory";
const TotalTransactions = ({ expenseList }) => {
  console.log(expenseList);
  return (
    <div className={style.TotalTransactionsConWraper}>
      <h1>Total Transactions</h1>
      <div className={style.TotalTransactionsCon}>
        {expenseList.map((item, index) => (
          <TotalExpenseCategory key={index} expense={item} />
        ))}
      </div>
    </div>
  );
};

export default TotalTransactions;
