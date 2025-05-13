"use client"

import { DataTable } from '@/components/tables'
import type { Transaction } from '@/types/transaction'

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
      accessorKey: 'name',
      header: 'Name',
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
      accessorKey: 'note',
      header: 'Note',
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="border rounded-lg">
      <DataTable columns={columns} data={transactions} />
    </div>
  )
}

export default TransactionTable
