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

export const GET_TIMESERIES = gql`
  query GetTimelineAnalytics($accountId: String!, $from: DateTime!, $to: DateTime!) {
    getTimelineAnalytics(accountId: $accountId, from: $from, to: $to) {
      bucket
      earning
      expense
      investment
      other
      credit
      debit
    }
  }
`
