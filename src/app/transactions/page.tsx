import AppLayout from '@/components/layouts/app-layout'

import AddTransactionForm from './_components/add-form'
import TransactionTable from './_components/transaction-table'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Transaction history',
}

const TransactionsPage = async () => {
  return (
    <AppLayout title="Transactions">
      <div className="flex justify-end mb-4">
        <AddTransactionForm />
      </div>
      <div className="bg-white rounded-lg">
        <TransactionTable />
      </div>
    </AppLayout>
  )
}

export default TransactionsPage
