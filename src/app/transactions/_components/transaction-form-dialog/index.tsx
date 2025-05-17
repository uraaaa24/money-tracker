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
  initialValues: TransactionFormInferType
  onSubmit: (values: TransactionFormInferType) => Promise<void>
  mode: 'create' | 'edit'
}
const TransactionFormDialog = ({
  trigger,
  open,
  setOpen,
  initialValues,
  onSubmit,
  mode,
}: TransactionFormDialogProps) => {
  const form = useForm<TransactionFormInferType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: transactionDefaultValues,
  })

  const handleSubmit = async (values: TransactionFormInferType) => {
    await onSubmit(values)
    form.reset(initialValues)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription className="hidden">
            {mode === 'create'
              ? 'Fill in the form below to add a new transaction.'
              : 'Update the fields below and save your changes.'}
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
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Saving…' : mode === 'create' ? 'Submit' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionFormDialog
