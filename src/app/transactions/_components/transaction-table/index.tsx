"use client"

import DataTable from '@/components/tables'
import type { Transaction } from '@/types/transaction'

import TransactionTableActionCell from './action-cell'
import { useGetTransactions } from '../../_hooks/use-transactions'

import type { ColumnDef } from '@tanstack/react-table'

const TransactionTable = () => {
  const { isLoading, error, transactions } = useGetTransactions()

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'category',
      header: 'Category',
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

  return <DataTable columns={columns} data={transactions}
    isLoading={isLoading}
    error={error}
  />
}

export default TransactionTable
