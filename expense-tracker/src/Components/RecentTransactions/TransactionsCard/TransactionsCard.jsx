import React from "react";

const TransactionsCard = ({ expense, handleDelete, handleEdit }) => {
  return (
    <div>
      <div>
        <div>
          <h2>{expense.title}</h2>
          <p>{expense.date}</p>
        </div>
      </div>
      <div>
        <p>{expense.price}</p>
        <button
          onClick={() => {
            handleDelete(expense._id);
          }}
        >
          delete
        </button>
        <button
          onClick={() => {
            handleEdit(expense._id);
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
};

export default TransactionsCard;
