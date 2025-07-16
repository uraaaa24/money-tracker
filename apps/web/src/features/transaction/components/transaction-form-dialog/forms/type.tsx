'use client'

import { PlusCircle, MinusCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  TransactionFormNames,
  type TransactionFormInferType,
} from '@/features/transaction/schemas/add-transaction'
import { type TransactionType, TransactionTypes } from '@/features/transaction/types/transaction'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const optionOnStyles: Record<TransactionType, string> = {
  [TransactionTypes.INCOME]:
    'hover:bg-green-50 data-[state=on]:bg-green-50 data-[state=on]:border-green-400 data-[state=on]:text-green-700',
  [TransactionTypes.EXPENSE]:
    'hover:bg-rose-50 data-[state=on]:bg-rose-50 data-[state=on]:border-rose-400 data-[state=on]:text-rose-700',
}

const OPTIONS = [
  { value: TransactionTypes.INCOME, label: 'Income', Icon: PlusCircle },
  { value: TransactionTypes.EXPENSE, label: 'Expense', Icon: MinusCircle },
] as const satisfies ReadonlyArray<{
  value: TransactionType
  label: string
  Icon: typeof PlusCircle
}>

const TypeField = () => {
  const form = useFormContext<TransactionFormInferType>()

  return (
    <FormField
      control={form.control}
      name={TransactionFormNames.type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <ToggleGroup
              type="single"
              variant="default"
              className="w-full gap-1"
              value={field.value}
              onValueChange={(val) => {
                if (val) field.onChange(val as TransactionType)
              }}
            >
              {OPTIONS.map(({ value, label, Icon }) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  aria-label={label}
                  className={cn(
                    'flex-1 gap-1 mx-1 text-sm rounded-lg font-medium border',
                    optionOnStyles[value],
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TypeField
