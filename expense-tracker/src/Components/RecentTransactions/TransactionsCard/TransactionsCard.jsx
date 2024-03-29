import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { MdCardTravel } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CgCarousel } from "react-icons/cg";
import style from "./TransactionsCard.module.css";
import { FaChevronLeft } from "react-icons/fa";
const TransactionsCard = ({ expense, handleDelete, handleEdit }) => {
  const Icon = (type) => {
    switch (type) {
      case "food":
        return <IoFastFoodOutline className={style.categoryImg} />;
        break;
      case "entertainment":
        return <CiGift className={style.categoryImg} />;
        break;
      case "travel":
        return <MdCardTravel className={style.categoryImg} />;
        break;
      case "others":
        return <CgCarousel className={style.categoryImg} />;
        break;
      default:
        return;
    }
  };
  return (
    <div>
      <div className={style.TransactionsCardCon}>
        <div className={style.TransactionsCardDetailsCon}>
          <div className={style.TransactionsCardIconCon}>
            {Icon(expense.category)}
          </div>

          <div className={style.TransactionsCardpropertyCon}>
            <h2 className={style.TransactionsCardTitle}>{expense.title}</h2>
            <p className={style.TransactionsCardDate}>
              {new Date(expense.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className={style.TransactionsCardChangeHandleCon}>
          <p className={style.TransactionsCardPrice}>{expense.price}</p>
          <button
            className={style.TransactionsCardDeleteBtn}
            onClick={() => {
              handleDelete(expense._id);
            }}
          >
            <MdDeleteOutline className={style.TransactionsCardDeleteIcon} />
          </button>
          <button
            className={style.TransactionsCardEditBtn}
            onClick={() => {
              handleEdit(expense._id);
            }}
          >
            <FaRegEdit className={style.TransactionsCardEditIcon} />
          </button>
        </div>
      </div>
      <div className={style.TransactionsCardColorLine}></div>
    </div>
  );
};

export default TransactionsCard;
