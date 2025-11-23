import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query Transactions($accountId: String!, $limit: Float!, $orderDirection: String!, $orderBy: String!, $offset: Float!) {
    transactions(accountId: $accountId, limit: $limit, orderDirection: $orderDirection, orderBy: $orderBy, offset: $offset) {
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