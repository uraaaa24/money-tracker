import { useFormContext } from 'react-hook-form'

import { TransactionFormNames } from '@/app/transactions/_schemas/add-transaction'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const NoteField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={TransactionFormNames.note}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Note</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter note"
              maxLength={200}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default NoteField
