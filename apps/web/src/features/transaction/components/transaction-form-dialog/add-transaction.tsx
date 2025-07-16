'use client'

import { useState } from 'react'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  useCreateTransaction,
  useGetTransactions,
} from '@/features/transaction/hooks/use-transactions'
import type { TransactionFormInferType } from '@/features/transaction/schemas/add-transaction'

import TransactionFormDialog from './base'

const AddTransactionButton = () => {
  const [open, setOpen] = useState(false)
  const { createTransaction } = useCreateTransaction()
  const { mutate } = useGetTransactions()

  const handleCreate = async (values: TransactionFormInferType) => {
    await createTransaction(values)
    mutate()
  }

  return (
    <TransactionFormDialog
      trigger={
        <Button variant="outline" className="cursor-pointer">
          <Plus />
          Add
        </Button>
      }
      open={open}
      setOpen={setOpen}
      onSubmit={handleCreate}
    />
  )
}

export default AddTransactionButton
