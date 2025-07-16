'use client'

import { useState } from 'react'

import { Pen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  useUpdateTransaction,
  useGetTransactions,
} from '@/features/transaction/hooks/use-transactions'
import type { TransactionFormInferType } from '@/features/transaction/schemas/add-transaction'
import type { Transaction } from '@/features/transaction/types/transaction'

import TransactionFormDialog from './base'

type EditTransactionButtonProps = {
  transaction: Transaction
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [open, setOpen] = useState(false)
  const { updateTransaction } = useUpdateTransaction()
  const { mutate } = useGetTransactions()

  const initialValues: TransactionFormInferType = {
    ...transaction,
    amount: String(transaction.amount),
    date: new Date(transaction.date),
    categoryId: String(transaction.category.id),
    memo: transaction.memo || "",
  }

  const handleUpdate = async (values: TransactionFormInferType) => {
    await updateTransaction({ id: transaction.id, data: values })
    mutate()
  }

  return (
    <TransactionFormDialog
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer text-green-400 hover:text-green-500"
        >
          <span className="sr-only">Edit</span>
          <Pen />
        </Button>
      }
      open={open}
      setOpen={setOpen}
      initialValues={initialValues}
      onSubmit={handleUpdate}
    />
  )
}

export default EditTransactionButton
