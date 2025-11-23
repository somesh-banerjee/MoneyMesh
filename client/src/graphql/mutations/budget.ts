import { gql } from "@apollo/client";

export const CREATE_BUDGET = gql`
  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {
    createBudget(createBudgetInput: $createBudgetInput) {
      id
    }
  }
`;

export interface CreateBudgetInput {
  category: string;
  limit: string;
  period: 'MONTHLY' | 'YEARLY';
}

export const UPDATE_BUDGET = gql`
  mutation UpdateBudget($updateBudgetId: String!, $updateBudgetInput: UpdateBudgetInput!) {
  updateBudget(id: $updateBudgetId, updateBudgetInput: $updateBudgetInput) {
    id
  }
}
`;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateBudgetInput extends CreateBudgetInput {}

export const REMOVE_BUDGET = gql`
  mutation RemoveBudget($removeBudgetId: String!) {
    removeBudget(id: $removeBudgetId) {
      id
    }
  }
`;
