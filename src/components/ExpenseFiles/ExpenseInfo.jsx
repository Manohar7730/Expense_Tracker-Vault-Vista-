import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";

function ExpenseInfo({ userId }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenseCollection = collection(db, `users/${userId}/expenses`);
        const unsubscribe = onSnapshot(expenseCollection, (snapShot) => {
          let total = 0;
          let profitAmount = 0;
          let lossAmount = 0;

          snapShot.docs.forEach((doc) => {
            const expense = doc.data();
            total += expense.amount;
            if (expense.amount > 0) {
              profitAmount += expense.amount;
            } else {
              lossAmount += expense.amount;
            }
          });

          setTotalAmount(total);
          setProfit(profitAmount);
          setLoss(lossAmount);
        });
        // Clean up listener
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching expenses from Firestore: ", error);
      }
    };

    fetchExpenses();
  }, [userId]);

  // Log totalAmount just before calling toFixed
  console.log("totalAmount:", totalAmount);

  return (
    <div className="expenseInfoContainer">
      <div className="balance">
        <h4>YOUR BALANCE</h4>
        <h1>${totalAmount.toFixed(2)}</h1>
      </div>
      <div className="incomeExpenseContainer">
        <div>
          <h4>Income</h4>
          <p id="money-plus">+${profit}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus">-${Math.abs(loss)}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseInfo;
