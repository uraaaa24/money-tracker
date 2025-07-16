import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { TransactionFormNames } from '@/features/transaction/schemas/add-transaction'

const MemoField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={TransactionFormNames.memo}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Memo <span className="text-xs text-muted-foreground">(optional)</span></FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={field.value ?? ''}
              placeholder="Add a note about this transaction..."
              rows={3}
              className="resize-none"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default MemoField
