import React, { useEffect, useState } from "react";
import style from "./AddExpense.module.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
const AddExpense = ({ setIsModelOpen, addExpenseToList, expenseId }) => {
  const [inputExpense, setInputExpense] = useState({
    _id: "",
    title: "",
    price: "",
    category: "",
    date: "",
  });
  useEffect(() => {
    if (expenseId) {
      setInputExpense(expenseId);
    }
  }, []);

  const createUUID = () => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    return id;
  };

  const handleInput = (event, type) => {
    console.log(expenseId);
    const id = createUUID();

    setInputExpense({ ...inputExpense, [type]: event.target.value, _id: id });
  };
  const addExpense = (inputExpense) => {
    if (
      inputExpense.title.trim() &&
      inputExpense.price.trim() &&
      inputExpense.category.trim() &&
      inputExpense.date.trim()
    ) {
      addExpenseToList(inputExpense, expenseId);
    } else {
      enqueueSnackbar("required all field", { variant: "error" });
    }
  };

  return (
    <div className={style.expenseModelCon}>
      {expenseId ? <h1 className={style.expenseModelHead}>Edit Expense</h1> : <h1 className={style.expenseModelHead}>Add Expense</h1>}

      <div className={style.expenseModelInputCon}>
        <input
          required
          placeholder="title"
          value={inputExpense.title}
          onChange={(e) => {
            handleInput(e, "title");
          }}
          className={style.expenseModelInput}
        />
        <input
          placeholder="Price"
          value={inputExpense.price}
          onChange={(e) => {
            handleInput(e, "price");
          }}
          className={style.expenseModelInput}
        />
      </div>
      <div className={style.expenseModelInputCon}>
        <select
          name="Category"
          id="Category"
          value={inputExpense.category}
          placeholder="Select Category"
          onChange={(e) => {
            handleInput(e, "category");
          }}
          className={style.expenseModelInput}
        >
          <option>Select Category</option>
          <option value="entertainment">entertainment</option>
          <option value="food">food</option>
          <option value="travel">travel</option>
          <option value="others">others</option>
        </select>
        <input
          type="date"
          value={inputExpense.date}
          onChange={(e) => {
            handleInput(e, "date");
          }}
          className={style.expenseModelInput}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            addExpense(inputExpense);
          }}
          className={style.expenseModelAddBtn}
        
        >
          {expenseId ? "Edit Expense" : "Add Expense"}
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

export default AddExpense;
