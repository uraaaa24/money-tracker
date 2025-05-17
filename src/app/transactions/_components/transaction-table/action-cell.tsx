import ActionCell from '@/components/tables/action-cell'
import ActionCellDeleteButton from '@/components/tables/actions/delete-button'
import type { Transaction } from '@/types/transaction'

import { useDeleteTransaction, useGetTransactions } from '../../_hooks/use-transactions'
import EditTransactionButton from '../transaction-form-dialog/edit-transaction'

type TransactionTableActionCellProps = {
  transaction: Transaction
}

const TransactionTableActionCell = ({ transaction }: TransactionTableActionCellProps) => {
  const { mutate } = useGetTransactions()

  const { deleteTransaction } = useDeleteTransaction()

  const onDelete = async (transactionId: number) => {
    await deleteTransaction(transactionId)
    mutate()
  }

  return (
    <ActionCell
      editButton={<EditTransactionButton transaction={transaction} />}
      deleteButton={<ActionCellDeleteButton itemId={transaction.id} onDelete={onDelete} />}
    />
  )
}

export default TransactionTableActionCell
