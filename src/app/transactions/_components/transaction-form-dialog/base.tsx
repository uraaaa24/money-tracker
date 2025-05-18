'use client'

import type { Dispatch, SetStateAction } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  type TransactionFormInferType,
  transactionDefaultValues,
  transactionFormSchema,
} from '@/app/transactions/_schemas/add-transaction'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import AmountField from './forms/amount'
import CategoryField from './forms/category'
import DateField from './forms/date'
import NameField from './forms/name'
import NoteField from './forms/note'

type TransactionFormDialogProps = {
  trigger: React.ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  initialValues?: TransactionFormInferType
  onSubmit: (values: TransactionFormInferType) => Promise<void>
}
const TransactionFormDialog = ({
  trigger,
  open,
  setOpen,
  initialValues,
  onSubmit,
}: TransactionFormDialogProps) => {
  const isEdit = Boolean(initialValues)
  const defaultValues = isEdit ? initialValues : transactionDefaultValues

  const form = useForm<TransactionFormInferType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues,
  })

  const handleSubmit = async (values: TransactionFormInferType) => {
    await onSubmit(values)
    form.reset(initialValues)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    form.reset(initialValues)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription className="hidden">
            {isEdit
              ? 'Update the fields below and save your changes.'
              : 'Fill in the form below to add a new transaction.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DateField />
              <CategoryField />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NameField />
              <AmountField />
            </div>
            <NoteField />

            <DialogFooter>
              <DialogClose asChild onClick={handleClose}>
                <Button type="button" variant="outline" className='cursor-pointer'>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className='cursor-pointer'
              >
                {form.formState.isSubmitting ? 'Saving…' : isEdit ? 'Update' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionFormDialog
