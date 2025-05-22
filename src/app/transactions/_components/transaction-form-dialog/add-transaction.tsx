'use client'

import { useState } from 'react'

import { Plus } from 'lucide-react'


import { Button } from '@/components/ui/button'
import { useCreateTransaction, useGetTransactions } from '@/hooks/api/use-transactions'

import TransactionFormDialog from './base'

import type { TransactionFormInferType } from '../../../../schemas/add-transaction'


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
