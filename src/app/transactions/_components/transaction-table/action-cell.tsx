import ActionCell from '@/components/tables/action-cell'
import ActionCellDeleteButton from '@/components/tables/actions/delete-button'
import { useGetTransactions, useDeleteTransaction } from '@/hooks/api/use-transactions'
import type { Transaction } from '@/types/transaction'

import EditTransactionButton from '../transaction-form-dialog/edit-transaction'

type DeleteTransactionButtonProps = {
  transactionId: number
}

const DeleteTransactionButton = ({ transactionId }: DeleteTransactionButtonProps) => {
  const { mutate } = useGetTransactions()
  const { deleteTransaction } = useDeleteTransaction()

  const onDelete = async (transactionId: number) => {
    await deleteTransaction(transactionId)
    mutate()
  }

  return (
    <ActionCellDeleteButton
      itemId={transactionId}
      onDelete={() => onDelete(transactionId)}
    />
  )
}

type TransactionTableActionCellProps = {
  transaction: Transaction
}

const TransactionTableActionCell = ({ transaction }: TransactionTableActionCellProps) => {
  return (
    <ActionCell
      editButton={
        <EditTransactionButton transaction={transaction} />
      }
      deleteButton={
        <DeleteTransactionButton transactionId={transaction.id} />
      }
    />
  )
}

export default TransactionTableActionCell
