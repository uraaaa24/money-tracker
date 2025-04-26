import AppLayout from "@/components/layouts/app-layout"
import TransactionTable from "./_components/transaction-table"

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
