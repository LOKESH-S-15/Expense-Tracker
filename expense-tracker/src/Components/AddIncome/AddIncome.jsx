import React, { useState } from "react";

const AddIncome = ({ setIsModelOpen, addIncomeFromInput }) => {
  const [inputIncome, setInputIncome] = useState();
  const handleInput = (e) => {
    setInputIncome(e.target.value);
  };
  const addIncome = (inputIncome) => {
    addIncomeFromInput(inputIncome);
  };
  return (
    <div>
      <h1>Add Income</h1>
      <div>
        <input
          required
          placeholder="title"
          value={inputIncome}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <button
          onClick={(e) => {
            addIncome(inputIncome);
          }}
        >
          Add Expense
        </button>
        <button
          onClick={() => {
            setIsModelOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
