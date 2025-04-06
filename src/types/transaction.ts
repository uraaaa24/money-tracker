export type Transaction = {
  id: number
  user_id: number
  amount: number
  category: string
  note?: string
  date: string        // ISO日付形式: yyyy-mm-dd
  created_at: string  // ISO datetime
  updated_at: string  // ISO datetime
}
