'use client'

import type { Dispatch, SetStateAction } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import {
  transactionDefaultValues,
  type TransactionFormInferType,
  transactionFormSchema,
} from '@/features/transaction/schemas/add-transaction'

import AmountField from './forms/amount'
import CategoryField from './forms/category'
import DateField from './forms/date'
import MemoField from './forms/memo'
import TypeField from './forms/type'

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

      <DialogContent className="w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
          <DialogDescription className="hidden">
            {isEdit
              ? 'Update the transaction details below.'
              : 'Fill in the form to record a new transaction.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-2">
            <div className="space-y-4">
              <TypeField />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateField />
                <CategoryField />
              </div>

              <AmountField />
              <MemoField />
            </div>

            <DialogFooter>
              <DialogClose asChild onClick={handleClose}>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer transition-colors"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className="cursor-pointer transition-all disabled:opacity-50"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  isEdit ? 'Update Transaction' : 'Add Transaction'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionFormDialog
