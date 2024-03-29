import React from "react";
import style from "./TotalTransactions.module.css";
const TotalExpenseCategory = ({ expense }) => {
  const percentStyle = {
    width: `${expense.percentage}%`,
  };
  return (
    <div className={style.TotalExpenseCategoryCon}>
      <p className={style.TotalExpenseCategorytext}>{expense.category}</p>
      <div className={style.TotalExpenseCategoryLineCon}>
        <div
          style={percentStyle}
          className={style.TotalExpenseCategoryLine}
        ></div>
      </div>
    </div>
  );
};

export default TotalExpenseCategory;
