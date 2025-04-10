import AppLayout from "@/components/layouts/appLayout"
import TransactionTable from "./_components/transaction-table"

const TransactionsPage = async () => {
  return (
    <AppLayout title="Transactions Page">
      <TransactionTable />
    </AppLayout>
  )
}

export default TransactionsPage
