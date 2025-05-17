'use client'

import { useState } from 'react'

import { Plus } from 'lucide-react'

import {
  useCreateTransaction,
  useGetTransactions,
} from '@/app/transactions/_hooks/use-transactions'
import {
  transactionDefaultValues,
  type TransactionFormInferType,
} from '@/app/transactions/_schemas/add-transaction'
import { Button } from '@/components/ui/button'

import TransactionFormDialog from '..'

const AddTransactionButton = () => {
  const [open, setOpen] = useState(false)
  const { createTransaction } = useCreateTransaction()
  const { mutate } = useGetTransactions()

  const handleCreate = async (values: TransactionFormInferType) => {
    await createTransaction(values)
    mutate()
  }

  return <TransactionFormDialog
    trigger={
      <Button variant="outline" className="cursor-pointer">
        <Plus />
        Add
      </Button>
    }
    open={open}
    setOpen={setOpen}
    mode="create"
    initialValues={transactionDefaultValues}
    onSubmit={handleCreate}
  />
}

export default AddTransactionButton
