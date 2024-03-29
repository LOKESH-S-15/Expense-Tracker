import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import style from "./AddIncome.module.css";
const AddIncome = ({ setIsModelOpen, addIncomeFromInput }) => {
  const [inputIncome, setInputIncome] = useState("");
  const handleInput = (e) => {
    setInputIncome(e.target.value);
  };
  const addIncome = (inputIncome) => {
    if (inputIncome) {
      addIncomeFromInput(inputIncome);
    } else {
      enqueueSnackbar("required Income field", { variant: "error" });
    }
  };
  return (
    <div className={style.expenseModelCon}>
      <h1 className={style.expenseModelCon}>Add Income</h1>
      <div className={style.expenseModelInputCon}>
        <input
          required
          placeholder="Amount"
          value={inputIncome}
          onChange={(e) => {
            handleInput(e);
          }}
          className={style.expenseModelInput}
        />
        <button
          onClick={(e) => {
            addIncome(inputIncome);
          }}
          className={style.expenseModelAddBtn}
        >
          Add Expense
        </button>
        <button
          onClick={() => {
            setIsModelOpen(false);
          }}
          className={style.expenseModelEditBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
