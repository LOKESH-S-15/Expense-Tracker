import React from "react";
import style from "./ExpenseTypeCard.module.css";
const ExpenseTypeCard = ({ expenseType }) => {
  const styles = {
    backgroundColor: expenseType.color,
    height: "6px",
    width: "24px",
  };

  return (
    <div className={style.ExpenseTypeCardCon}>
      <div style={styles}></div>
      <p className={style.expenseTypeTitle}>{expenseType.category}</p>
    </div>
  );
};

export default ExpenseTypeCard;
