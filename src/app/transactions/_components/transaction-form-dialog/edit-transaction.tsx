'use client'

import { useState } from 'react'

import { Pen } from 'lucide-react'

import {
  useGetTransactions,
  useUpdateTransaction,
} from '@/app/transactions/_hooks/use-transactions'
import type { TransactionFormInferType } from '@/app/transactions/_schemas/add-transaction'
import { Button } from '@/components/ui/button'
import type { Transaction } from '@/types/transaction'

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
  }

  const handleUpdate = async (values: TransactionFormInferType) => {
    await updateTransaction(transaction.id, values)
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
