import styled from "styled-components";

const Form = styled.form`
  border: 1px solid gray;
  gap: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: flex-start;
  background-color: #ffdcd1;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: var(--input-width);
  height: var(--input-height);
  border: 1px solid gray;
  padding-left: 0.5rem;
`;

const SubmitBtn = styled.button`
  background-color: #5e4db1;
  width: var(--input-width);
  height: var(--input-height);
  color: white;
  border: none;
  font-size: 1.025rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: white;
    color: #5e4db1;
    border: 1px solid #5e4db1;
  }
`;

export { Form, Input, Label, SubmitBtn };
