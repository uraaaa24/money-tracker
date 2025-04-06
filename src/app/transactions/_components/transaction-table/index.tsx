import { DataTable } from '@/components/tables'
import type { Transaction } from '@/types/transaction'
import type { ColumnDef } from '@tanstack/react-table'

// TODO: 実際のAPIに変更する
async function getData(): Promise<Transaction[]> {
  return [
    {
      id: 1,
      user_id: 101,
      amount: 1200,
      category: 'food',
      note: 'Lunch at cafe',
      date: '2025-04-01',
      created_at: '2025-04-01T12:00:00Z',
      updated_at: '2025-04-01T12:00:00Z',
    },
    {
      id: 2,
      user_id: 101,
      amount: 3500,
      category: 'shopping',
      note: 'New T-shirt',
      date: '2025-04-03',
      created_at: '2025-04-03T09:30:00Z',
      updated_at: '2025-04-03T09:30:00Z',
    },
    {
      id: 3,
      user_id: 101,
      amount: 800,
      category: 'transport',
      note: 'Train to work',
      date: '2025-04-05',
      created_at: '2025-04-05T08:15:00Z',
      updated_at: '2025-04-05T08:15:00Z',
    },
  ]
}


const TransactionTable = async () => {
  const data = await getData()

  const columns: ColumnDef<Transaction>[] = [
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

  return <DataTable columns={columns} data={data} />
}

export default TransactionTable
