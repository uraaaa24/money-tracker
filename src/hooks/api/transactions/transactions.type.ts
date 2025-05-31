import type { TransactionType } from '@/types/transaction'

export type CreateTransactionRequestBody = {
  type: TransactionType
  date: string
  category_id: number
  amount: number
  memo?: string
}

export type PutTransactionRequestBody = CreateTransactionRequestBody 
