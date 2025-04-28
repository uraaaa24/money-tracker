import { useFormContext } from 'react-hook-form'

import { TransactionFormNames } from '@/app/transactions/_schemas/add-transaction'
import SingleDatePicker from '@/components/date-picker'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

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
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <SingleDatePicker
              selected={field.value}
              onSelect={field.onChange}
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
