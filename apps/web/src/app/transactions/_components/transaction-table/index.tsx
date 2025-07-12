'use client'

import DataTable from '@/components/parts/tables'
import { useGetTransactions } from '@/features/transaction/hooks/use-transactions'
import type { Transaction } from '@/features/transaction/types/transaction'

import TransactionTableActionCell from './action-cell'

import type { ColumnDef } from '@tanstack/react-table'

const TransactionTable = () => {
  const { isLoading, error, transactions } = useGetTransactions()

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'memo',
      header: 'Memo',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row: { original: transaction } }) => {
        return <TransactionTableActionCell transaction={transaction} />
      },
    },
  ]

  return <DataTable columns={columns} data={transactions} isLoading={isLoading} error={error} />
}

export default TransactionTable
