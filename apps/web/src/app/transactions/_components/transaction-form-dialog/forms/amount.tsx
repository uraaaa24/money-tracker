import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TransactionFormNames } from '@/features/transaction/schemas/add-transaction'

const MIN_AMOUNT = 0
const MAX_AMOUNT = 1000000 // 100万円

const AmountField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={TransactionFormNames.amount}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Amount<span className="-ml-1.5 text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              inputMode="decimal"
              placeholder="Enter amount"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onKeyDown={(e) => {
                // NOTE: 「-」「e」「+」を入力させない（手入力でも防ぐ）
                if (['-', 'e', '+'].includes(e.key)) e.preventDefault();
              }}
              className='[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AmountField
