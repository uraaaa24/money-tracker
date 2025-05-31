import { useMemo } from 'react'

import { useFormContext, useWatch } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCategories } from '@/hooks/api/categories/use-categories'
import { TransactionFormNames } from '@/schemas/transactions/add-transaction'

const CategoryField = () => {
  const { control } = useFormContext()
  const transactionType = useWatch({ control, name: 'type' })

  const { categories, isLoading } = useGetCategories()

  const filteredCategories = useMemo(() => {
    if (!categories) return []

    return categories.filter(
      (category) => category.type === transactionType
    )
  }, [categories, transactionType])

  return (
    <FormField
      control={control}
      name={TransactionFormNames.categoryId}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              Category<span className="-ml-1.5 text-red-500">*</span>
            </FormLabel>
            <FormControl>
              {isLoading ? (
                <Skeleton className="h-9 w-full rounded-md" />
              ) : (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories?.map((category) => {
                      return (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default CategoryField
