import { useFormContext } from 'react-hook-form'

import SingleDatePicker from '@/components/date-picker'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TransactionFormNames } from '@/schemas/transactions/add-transaction'

const DateField = () => {
  const { control } = useFormContext()

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    return date > today || date < new Date('1900-01-01')
  }

  return (
    <FormField
      control={control}
      name={TransactionFormNames.date}
      render={({ field }) => (
        <FormItem >
          <FormLabel>
            Date<span className="-ml-1.5 text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <SingleDatePicker
              selected={field.value}
              onSelect={(date) => {
                if (date) field.onChange(date)
              }}
              disabled={isDateDisabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DateField
