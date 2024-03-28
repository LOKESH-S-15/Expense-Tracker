import React, { useEffect, useState } from "react";

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
    addExpenseToList(inputExpense, expenseId);
  };

  return (
    <div>
      {expenseId ? <h1>Edit Expense</h1> : <h1>Add Expense</h1>}

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
          {expenseId ? "Edit Expense" : "Add Expense"}
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

export default AddExpense;
