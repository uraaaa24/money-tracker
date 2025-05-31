import useSWR from 'swr'

import { useFetcher } from '@/hooks/use-fetcher'

import type { Category } from '../types/category'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const PREFIX = '/categories'

const API_CATEGORIES_URL = `${API_URL}${PREFIX}`

export const useGetCategories = () => {
  const { authFetcher } = useFetcher()

  const { data, isLoading, isValidating, error, mutate } = useSWR<Category[]>(
    API_CATEGORIES_URL,
    authFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    isLoading,
    isValidating,
    error,
    categories: data,
    mutate,
  }
}
