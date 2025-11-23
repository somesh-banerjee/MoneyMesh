import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      amount
      category
      counterparty
      created_at
      direction
      id
      note
      type
    }
  }
`;

export interface CreateTransactionInput {
  account_id: string;
  amount: string;
  category: string;
  counterparty: string;
  direction: "CREDIT" | "DEBIT";
  note: string;
  type: "TRANSFER" | "INCOME" | "EXPENSE" | "OTHER";
  created_at: string;
}