import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import AddExpense from "../AddExpense/AddExpense";
import AddIncome from "../AddIncome/AddIncome";
import RecentTransactions from "../RecentTransactions/RecentTransactions";
const MainPage = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseList, setExpenseList] = useState([]);
  const [idToBeEdit, setIdToBeEdit] = useState();
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
    if (
      getIncomeBalance(walletBalance, expenseList) -
        Number(inputExpense.price) <
      0
    ) {
      alert("You don't have enough money");
    } else {
      setExpenseList([...expenseList, inputExpense]);
    }
    setIsModelOpen(false);
  };
  const addIncomeFromInput = (inputIncome) => {
    setWalletBalance((prev) => prev + Number(inputIncome));
    setIsModelOpen(false);
  };
  const handleExpenseDelete = (id) => {
    let updatedExpenseList = expenseList.filter((each) => each._id !== id);
    setExpenseList(updatedExpenseList);
  };
  const handleExpenseEdit = (id) => {
    const expenseToBeEdited = expenseList.find((each) => each._id === id);
    setModelType("edit");
    setIdToBeEdit(expenseToBeEdited);
    setIsModelOpen(true);
  };
  const editExpenseFromExpenseList = (editedExpense, expenseToBeUpdated) => {
    let updatedExpenseList = expenseList.filter(
      (each) => each._id !== expenseToBeUpdated._id
    );
    editedExpense._id = expenseToBeUpdated._id;
    updatedExpenseList = [...updatedExpenseList, editedExpense];
    setExpenseList(updatedExpenseList);
    setIsModelOpen(false);
  };

  console.log(expenseList);
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
      <div>
        <RecentTransactions
          expenseList={expenseList}
          handleDelete={handleExpenseDelete}
          handleEdit={handleExpenseEdit}
        />
      </div>

      <ReactModal isOpen={isModelOpen}>
        {modelType === "income" ? (
          <AddIncome
            setIsModelOpen={setIsModelOpen}
            addIncomeFromInput={addIncomeFromInput}
          />
        ) : modelType === "expense" ? (
          <AddExpense
            setIsModelOpen={setIsModelOpen}
            addExpenseToList={addExpenseToList}
          />
        ) : (
          <AddExpense
            setIsModelOpen={setIsModelOpen}
            addExpenseToList={editExpenseFromExpenseList}
            expenseId={idToBeEdit}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default MainPage;
