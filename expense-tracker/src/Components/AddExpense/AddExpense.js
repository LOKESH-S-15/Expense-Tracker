import React, { useState } from "react";

const AddExpense = ({ setIsModelOpen, addExpenseToList }) => {
  const [inputExpense, setInputExpense] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const handleInput = (event, type) => {
    setInputExpense({ ...inputExpense, [type]: event.target.value });
  };
  const addExpense = (inputExpense) => {
    addExpenseToList(inputExpense);
  };
  return (
    <div>
      <h1>Add Expense</h1>
      <div>
        <input
          required
          placeholder="title"
          value={inputExpense.title}
          onChange={(e) => {
            handleInput(e, "title");
          }}
        />
        <input
          placeholder="Price"
          value={inputExpense.price}
          onChange={(e) => {
            handleInput(e, "price");
          }}
          required
        />
      </div>
      <div>
        <select
          name="Category"
          id="Category"
          placeholder="Select Category"
          onChange={(e) => {
            handleInput(e, "category");
          }}
          required
        >
          <option disabled>Select Category</option>
          <option value="entertainment">entertainment</option>
          <option value="food">food</option>
          <option value="travel">travel</option>
        </select>
        <input
          type="date"
          value={inputExpense.date}
          onChange={(e) => {
            handleInput(e, "date");
          }}
          required
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            addExpense(inputExpense);
          }}
        >
          Add Expense
        </button>
        <button
          onClick={() => {
            setIsModelOpen(false);
          }}
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
