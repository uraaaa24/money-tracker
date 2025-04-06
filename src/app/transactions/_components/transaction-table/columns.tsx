'use client'

import type { Transaction } from '@/types/transaction'
import type { ColumnDef } from '@tanstack/react-table'

export const transactionTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
]
