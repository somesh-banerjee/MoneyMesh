import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const REGISTER_USER = gql`
    mutation Register($createUserInput: CreateUserInput!) {
        register(createUserInput: $createUserInput) {
            email
        }
    }
`;
