export type Transaction = {
  id: number
  user_id: number
  title: string
  amount: number
  category: string
  date: string        // ISO日付形式: yyyy-mm-dd
  created_at: string  // ISO datetime
  updated_at: string  // ISO datetime
}
