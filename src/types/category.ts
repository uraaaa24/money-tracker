import type { TransactionType } from './transaction'

export type Category = {
  id: number
  user_id: number
  name: string
  type: TransactionType
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
}
