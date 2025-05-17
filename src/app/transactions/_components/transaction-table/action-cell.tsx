import ActionCell from '@/components/tables/action-cell'
import type { Transaction } from '@/types/transaction'

import { useDeleteTransaction, useGetTransactions } from '../../_hooks/use-transactions'

type TransactionTableActionCellProps = {
  transaction: Transaction
}

const TransactionTableActionCell = ({
  transaction,
}: TransactionTableActionCellProps) => {
  const { mutate } = useGetTransactions()

  const { deleteTransaction } = useDeleteTransaction()

  const onEdit = (transaction: Transaction) => {
    // Handle edit action
    console.log('Edit transaction:', transaction)
  }

  const onDelete = async (transactionId: number) => {
    await deleteTransaction(transactionId)
    mutate()
  }

  return <ActionCell item={transaction} onEdit={onEdit} onDelete={onDelete} />
}

export default TransactionTableActionCell
