import TransactionTable from "./_components/transaction-table"

const TransactionsPage = async () => {
  return (
    <>
      Transactions Page
      <div className="container mx-auto py-10">
        <TransactionTable />
      </div>
    </>
  )
}

export default TransactionsPage
