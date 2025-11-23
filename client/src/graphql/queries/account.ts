import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query Accounts($limit: Float!, $offset: Float!, $orderBy: String!, $orderDirection: String!) {
    accounts (limit: $limit, offset: $offset, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      name
      type
    }
  }
`;

export const GET_ACCOUNT_BY_ID = gql`
  query Account($accountId: String!) {
    account(id: $accountId) {
    balance
    created_at
    currency
    id
    name
    type
    updated_at
  }
}
 `; 