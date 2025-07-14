export type MonthlySummary = {
  total_income: number
  total_expense: number
  net_amount: number
  transaction_count: number
}

export type CategorySummary = {
  category_name: string
  amount: number
  percentage: number
}

export type RecentTransaction = {
  id: number
  type: 'income' | 'expense'
  amount: number
  category_name: string
  date: string
  memo: string
}

export type DashboardSummary = {
  current_month: MonthlySummary
  previous_month: MonthlySummary
  top_expense_categories: CategorySummary[]
  recent_transactions: RecentTransaction[]
}