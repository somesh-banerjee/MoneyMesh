import { gql } from "@apollo/client";

export const CREATE_INVESTMENT = gql`
  mutation CreateInvestment($createInvestmentInput: CreateInvestmentInput!) {
    createInvestment(createInvestmentInput: $createInvestmentInput) {
      id
    }
  } 
`;

export interface CreateInvestmentInput {
  amount_invested: string;
  asset_name: string;
  asset_type: 'STOCK' | 'MUTUAL_FUND' | 'ETF' | 'CRYPTO' | 'BOND' | 'REAL_ESTATE' | 'COMMODITY';
  expected_cagr: string;
  current_value: string;
  currency: string;
}


