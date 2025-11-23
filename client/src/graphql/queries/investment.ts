import { gql } from "@apollo/client";

export const GET_INVESTMENTS = gql`
  query Investments($limit: Float!, $offset: Float!) {
    investments(limit: $limit, offset: $offset) {
      amount_invested
      asset_name
      asset_type
      expected_cagr
      current_value
      id
      updated_at
      created_at
    }
  }
`;
