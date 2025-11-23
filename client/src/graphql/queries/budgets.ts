import { gql } from "@apollo/client";

export const GET_BUDGETS = gql`
  query Budgets($orderDirection: String!, $orderBy: String!, $offset: Float!, $limit: Float!) {
    budgets(orderDirection: $orderDirection, orderBy: $orderBy, offset: $offset, limit: $limit) {
      updated_at
      period
      limit
      id
      created_at
      category
    }
  }
`;
