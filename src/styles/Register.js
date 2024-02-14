import styled from "styled-components";

export const RegisterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

export const SubmitButton = styled.button`
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;

  &:hover {
    background-color: #0077cc;
  }
`;

export const ErrorMessage = styled.p`
  color: #ed4956;
  margin-top: 5px;
  font-size: 14px;
`;

export const SuccessMessage = styled.p`
  color: #009743;
  margin-top: 5px;
  font-size: 14px;
`;
