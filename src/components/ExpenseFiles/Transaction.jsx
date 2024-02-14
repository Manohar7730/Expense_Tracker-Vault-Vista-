import React, { useState } from "react";
import styled from "styled-components";
import EditImage from "../../assets/images/images/edit.png";
import DeleteImage from "../../assets/images/images/trash-bin.png";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import TransactionStyles from "../../styles/Transaction";

const TransactionWrapper = styled.li`
  ${TransactionStyles.TransactionWrapper}
`;
const TransactionOptions = styled.div`
  ${TransactionStyles.TransactionOptions}
`;
const BtnContainer = styled.div`
  ${TransactionStyles.BtnContainer}
`;
const Button = styled.button`
  ${TransactionStyles.Button}
`;
const Text = styled.p`
  ${TransactionStyles.Text}
`;
const Input = styled.input`
  ${TransactionStyles.Input}
`;

function Transaction({ expense, deleteExpense, userId }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(expense.text);
  const [updatedAmount, setUpdatedAmount] = useState(expense.amount);

  const handleUpdate = async () => {
    try {
      const expenseRef = doc(db, `users/${userId}/expenses`, expense.id);
      await updateDoc(expenseRef, {
        text: updatedText,
        amount: parseFloat(updatedAmount) || 0,
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error Updating expense: ", error);
    }
  };

  return (
    <TransactionWrapper key={expense.id} amount={expense.amount}>
      <TransactionOptions>
        {editMode ? (
          <div className="update">
            <Input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <Input
              type="number"
              value={isNaN(updatedAmount) ? "" : updatedAmount.toString()}
              onChange={(e) =>
                setUpdatedAmount(parseFloat(e.target.value) || "")
              }
            />
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        ) : (
          <div className="transactionDetails">
            <Text>{expense.text}</Text>
            <Text>{`${isNaN(expense.amount) ? 0 : expense.amount}`}</Text>
          </div>
        )}
        <BtnContainer>
          <div className="edit" onClick={() => setEditMode(true)}>
            <img
              src={EditImage}
              alt="Edit"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="delete" onClick={() => deleteExpense(expense.id)}>
            <img
              src={DeleteImage}
              alt="Delete"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </BtnContainer>
      </TransactionOptions>
    </TransactionWrapper>
  );
}

export default Transaction;
