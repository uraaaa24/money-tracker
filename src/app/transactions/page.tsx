import AppLayout from '@/components/layouts/app-layout'
import type { Metadata } from 'next'
import TransactionTable from './_components/transaction-table'

export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Transaction history',
}

const TransactionsPage = async () => {
  return (
    <AppLayout title="Transactions Page">
      <div className="bg-white rounded-lg">
        <TransactionTable />
      </div>
    </AppLayout>
  )
}

export default TransactionsPage
