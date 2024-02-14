import React, { useRef } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Form, Input, Label, SubmitBtn } from "../../styles/ExpenseForm.js";

function ExpenseForm({ userId }) {
  const expenseTextInputRef = useRef();
  const expenseAmountInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseText = expenseTextInputRef.current.value;
    const expenseAmount = expenseAmountInputRef.current.value;

    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expenseData = {
      text: expenseText,
      amount: parseInt(expenseAmount),
    };

    try {
      const userExpenseRef = collection(db, `users/${userId}/expenses`);
      await setDoc(doc(userExpenseRef), expenseData);
      console.log("Expense added for user: ", userId);
    } catch (error) {
      console.error("Error adding expense: ", error);
    }

    expenseTextInputRef.current.focus();
    clearInput();
  };

  const clearInput = () => {
    expenseAmountInputRef.current.value = "";
    expenseTextInputRef.current.value = "";
  };

  return (
    <Form className="expenseForm" onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      <Label htmlFor="expenseText">Text</Label>
      <Input
        type="text"
        className="expense-input"
        id="expenseText"
        placeholder="Enter text..."
        required
        ref={expenseTextInputRef}
      />
      <div>
        <Label htmlFor="expenseAmount">Amount</Label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <Input
        className="expense-input"
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInputRef}
        required
      />
      <SubmitBtn type="submit" id="submitBtn">
        Add transaction
      </SubmitBtn>
    </Form>
  );
}

export default ExpenseForm;
