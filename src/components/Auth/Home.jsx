import React from "react";
import ExpenseForm from "../ExpenseFiles/ExpenseForm";
import ExpenseInfo from "../ExpenseFiles/ExpenseInfo";
import ExpenseList from "../ExpenseFiles/ExpenseList";
import { useParams } from "react-router-dom";
import styles from "../../styles/Home.module.css";

function Home() {
  const { userId } = useParams();
  return (
    <>
      <div className={styles.Home}>
        <div className="main">
          <ExpenseForm userId={userId} />
          <ExpenseInfo userId={userId} />
        </div>
        <div className="expenseContainer">
          <ExpenseList userId={userId} />
        </div>
      </div>
      <p>{userId}</p>
    </>
  );
}

export default Home;
