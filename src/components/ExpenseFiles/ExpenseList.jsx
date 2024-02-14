import React, { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import Transaction from "./Transaction";
import styles from "../../styles/ExpenseList.module.css";

const ExpenseList = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesRef = collection(db, `users/${userId}/expenses`);
        const unsubscribe = onSnapshot(expensesRef, (querySnapshot) => {
          const expensesData = [];
          querySnapshot.forEach((doc) => {
            expensesData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setExpenses(expensesData);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching expenses: ", error);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  const deleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/expenses`, expenseId));
      console.log("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense: ", error);
    }
  };

  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {expenses.map((expense, index) => (
          <Transaction
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            userId={userId} // Pass userId prop here
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
