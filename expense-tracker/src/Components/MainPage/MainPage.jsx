import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import AddExpense from "../AddExpense/AddExpense";
import AddIncome from "../AddIncome/AddIncome";
import RecentTransactions from "../RecentTransactions/RecentTransactions";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import style from "./MainPage.module.css";
import ExpenseTypeCard from "../ExpenseTypeCard/ExpenseTypeCard";
import TotalTransactions from "../TotalTransactions/TotalTransactions";

const MainPage = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenseList, setExpenseList] = useState([]);
  const [idToBeEdit, setIdToBeEdit] = useState();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modelType, setModelType] = useState();
  const [rechartData, setRechartData] = useState();
  const [totalExpensePercentage, setTotalExpensePercentage] = useState([]);
  useEffect(() => {
    getDatasOfRechart();
    getChartDataWithPercentages();
  }, [expenseList]);
  useEffect(() => {
    getListFromLocalStroage();
  }, []);
  const getListFromLocalStroage = () => {
    let expensesList = localStorage.getItem("expenseList");
    console.log(expensesList);
    if (expensesList) {
      console.log("inside e");
      setExpenseList(JSON.parse(expensesList));
    }
  };
  const getDatasOfRechart = () => {
    let chartData = [
      { name: "Food", value: getTotalPriceByCatagory(expenseList, "food") },
      {
        name: "Entertainment",
        value: getTotalPriceByCatagory(expenseList, "entertainment"),
      },
      { name: "Travel", value: getTotalPriceByCatagory(expenseList, "travel") },
      { name: "Others", value: getTotalPriceByCatagory(expenseList, "others") },
    ];
    setRechartData(chartData);
  };
  const getTotalPriceByCatagory = (expenseList, type) => {
    let total = expenseList.reduce((accumulator, currentValue) => {
      if (currentValue.category === type) {
        accumulator += Number(currentValue.price);
      }
      return accumulator;
    }, 0);
    console.log(total);
    return total;
  };
  console.log(rechartData);
  const colors = [
    { category: "Food", color: "red" },
    { category: "Entertainment", color: "blue" },
    { category: "Travel", color: "green" },
    { category: "Others", color: "orange" },
  ];

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
      enqueueSnackbar("You don't have enough money", { variant: "error" });
    } else {
      let UpdatedList = [...expenseList, inputExpense];
      setToLocalStorage(UpdatedList);
      setExpenseList(UpdatedList);
    }
    setIsModelOpen(false);
  };
  const addIncomeFromInput = (inputIncome) => {
    setWalletBalance((prev) => prev + Number(inputIncome));
    setIsModelOpen(false);
  };
  const handleExpenseDelete = (id) => {
    let updatedExpenseList = expenseList.filter((each) => each._id !== id);
    setToLocalStorage(updatedExpenseList);
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
    setToLocalStorage(updatedExpenseList);
    setExpenseList(updatedExpenseList);
    setIsModelOpen(false);
  };
  const setToLocalStorage = (expenseList) => {
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
  };
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className={style.rechartInnerText}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getChartDataWithPercentages = () => {
    let TotalExpenseData = [
      { category: "Food", type: "food", percentage: 0 },
      { category: "Entertainment", type: "entertainment", percentage: 0 },
      { category: "Travel", type: "travel", percentage: 0 },
      { category: "Others", type: "others", percentage: 0 },
    ];

    TotalExpenseData = TotalExpenseData.map((item) => {
      return {
        ...item,
        percentage: Math.round(
          (getTotalPriceByCatagory(expenseList, item.type) /
            getExpense(expenseList)) *
            100,
          0
        ),
      };
    });

    TotalExpenseData = TotalExpenseData.sort(
      (a, b) => b.percentage - a.percentage
    );

    setTotalExpensePercentage(TotalExpenseData);
  };

  console.log(totalExpensePercentage);
  console.log(expenseList);
  return (
    <div className={style.expensePageCon}>
      <h1 className={style.expensePageHead}>Expense Tracker</h1>
      <div className={style.expensePageTopSection}>
        <div className={style.expensePageincomeAndExpenseCon}>
          <p className={style.expensePageincomeHead}>
            Wallet Balance:₹{" "}
            <span className={style.expensePageincomespan}>
              {getIncomeBalance(walletBalance, expenseList)}
            </span>
          </p>
          <button
            onClick={() => {
              setModelType("income");
              setIsModelOpen(true);
            }}
            className={style.expensePageincomeBtn}
          >
            + Add Income
          </button>
        </div>
        <div className={style.expensePageincomeAndExpenseCon}>
          <p className={style.expensePageExpenseHead}>
            Expenses:₹{" "}
            <span className={style.expensePageExpensespan}>
              {getExpense(expenseList)}
            </span>
          </p>
          <button
            onClick={() => {
              setModelType("expense");
              setIsModelOpen(true);
            }}
            className={style.expensePageExpenseBtn}
          >
            + Add Expenses
          </button>
        </div>
        <div className={style.rechartSectionCon}>
          <div className={style.rechartCon}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={rechartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {colors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index].color} />
                  ))}
                  <Tooltip />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={style.rechartExpenseType}>
            {colors.map((each, index) => {
              return <ExpenseTypeCard expenseType={each} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={style.expensePageBottomSectionCon}>
        <div className={style.expensePageBottomSection}>
          <RecentTransactions
            expenseList={expenseList}
            handleDelete={handleExpenseDelete}
            handleEdit={handleExpenseEdit}
          />
          <TotalTransactions expenseList={totalExpensePercentage} />
        </div>
      </div>
      <ReactModal isOpen={isModelOpen} className={style.modelCon}>
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
