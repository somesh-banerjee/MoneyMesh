import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query Accounts {
    accounts {
      id
      name
      type
    }
  }
`;