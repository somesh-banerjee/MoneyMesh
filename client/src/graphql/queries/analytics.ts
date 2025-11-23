import { gql } from "@apollo/client";

export const GET_HOME_PAGE_ANALYTICS = gql`
  query GetHomePageAnalytics($period: String!, $range: String!) {
    getHomePageAnalytics(period: $period, range: $range) {
      earnings
      expenses
      investments
      totalBankBalance
      totalInvestment
    }
  }
`