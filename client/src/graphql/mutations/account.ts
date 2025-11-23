import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
      id
      name
      type
    }
  }
`;
