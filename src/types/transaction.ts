export const TransactionTypes = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const
export type TransactionType = typeof TransactionTypes[keyof typeof TransactionTypes]

export type Transaction = {
  id: number
  user_id: number
  title: string
  amount: number
  category: string
  type: TransactionType
  date: string        // ISO日付形式: yyyy-mm-dd
  created_at: string  // ISO datetime
  updated_at: string  // ISO datetime
}
