'use client'

import { useState } from 'react'

import { Pen } from 'lucide-react'

import { useGetTransactions } from '@/app/transactions/_hooks/use-transactions'
import type { TransactionFormInferType } from '@/app/transactions/_schemas/add-transaction'
import { Button } from '@/components/ui/button'

import TransactionFormDialog from './base'

type EditTransactionButtonProps = {
  transaction: TransactionFormInferType
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [open, setOpen] = useState(false)
  // const { createTransaction } = useCreateTransaction()
  const { mutate } = useGetTransactions()

  const handleUpdate = async (values: TransactionFormInferType) => {
    // await createTransaction(values)
    console.log('values', values)
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
      initialValues={{
        ...transaction,
        date: new Date(transaction.date),
      }}
      onSubmit={handleUpdate}
    />
  )
}

export default EditTransactionButton
