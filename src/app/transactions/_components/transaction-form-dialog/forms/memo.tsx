import { useFormContext } from 'react-hook-form'

import { TransactionFormNames } from '@/app/transactions/_schemas/add-transaction'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const MemoField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={TransactionFormNames.memo}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Memo</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="text"
              value={field.value ?? ''}
              placeholder="Enter memo"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default MemoField
