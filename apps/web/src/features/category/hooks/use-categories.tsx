import useSWR from 'swr'

import { useFetcher } from '@/hooks/use-fetcher'
import { env } from '@/lib/env'

import type { Category } from '../types/category'

const API_CATEGORIES_URL = `${env.NEXT_PUBLIC_API_URL}/categories`

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
