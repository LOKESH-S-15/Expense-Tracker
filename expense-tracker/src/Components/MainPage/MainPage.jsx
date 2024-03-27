import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import AddExpense from "../AddExpense/AddExpense";
import AddIncome from "../AddIncome/AddIncome";
const MainPage = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseList, setExpenseList] = useState([]);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modelType, setModelType] = useState();

  const getIncomeBalance = (walletBalance, expenseList) => {
    const balance = walletBalance - getExpense(expenseList);
    return balance;
  };
  const getExpense = (expenseList) => {
    if (expenseList.length === 0) return 0;
    const expense = expenseList.reduce(
      (value, each) => value + Number(each.price),
      0
    );
    return expense;
  };

  const addExpenseToList = (inputExpense) => {
    setExpenseList([...expenseList, inputExpense]);
    setIsModelOpen(false);
  };
  const addIncomeFromInput = (inputIncome) => {
    setWalletBalance((prev) => prev + Number(inputIncome));
    setIsModelOpen(false);
  };
  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <div>
          <p>
            Wallet Balance:₹{" "}
            <span>{getIncomeBalance(walletBalance, expenseList)}</span>
          </p>
          <button
            onClick={() => {
              setModelType("income");
              setIsModelOpen(true);
            }}
          >
            + Add Income
          </button>
        </div>
        <div>
          <p>
            Expenses:₹ <span>{getExpense(expenseList)}</span>
          </p>
          <button
            onClick={() => {
              setModelType("expense");
              setIsModelOpen(true);
            }}
          >
            + Add Expenses
          </button>
        </div>
      </div>
      <ReactModal isOpen={isModelOpen}>
        {modelType === "income" ? (
          <AddIncome
            setIsModelOpen={setIsModelOpen}
            addIncomeFromInput={addIncomeFromInput}
          />
        ) : (
          <AddExpense
            setIsModelOpen={setIsModelOpen}
            addExpenseToList={addExpenseToList}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default MainPage;
