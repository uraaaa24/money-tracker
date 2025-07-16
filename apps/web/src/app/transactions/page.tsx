import AppLayout from '@/components/layouts/app-layout'
import AddTransactionButton from '@/features/transaction/components/transaction-form-dialog/add-transaction'
import TransactionTable from '@/features/transaction/components/transaction-table'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Transaction history',
}

const TransactionsPage = async () => {
  return (
    <AppLayout title="Transactions">
      <div className="flex justify-end mb-4">
        <AddTransactionButton />
      </div>
      <TransactionTable />
    </AppLayout>
  )
}

export default TransactionsPage
