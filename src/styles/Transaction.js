import { css } from "styled-components";

const TransactionStyles = {
  TransactionWrapper: css`
    width: 100%;
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    height: 100%;
  `,
  TransactionOptions: css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-grow: 1;
  `,
  BtnContainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 5em;
  `,
  Button: css`
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.15s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }
  `,
  Text: css`
    margin: 0;
    font-size: 1.5rem;
  `,
  Input: css`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  `,
};

export default TransactionStyles;
