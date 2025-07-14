'use client'

import useSWR from 'swr'

import { useFetcher } from '@/hooks/use-fetcher'
import { env } from '@/lib/env'

import type { DashboardSummary } from '../types/dashboard'

const API_DASHBOARD_URL = `${env.NEXT_PUBLIC_API_URL}/dashboard/summary`

export const useGetDashboardSummary = () => {
  const { authFetcher } = useFetcher()

  const { data, isLoading, isValidating, error, mutate } = useSWR<DashboardSummary>(
    API_DASHBOARD_URL,
    authFetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  )

  return {
    isLoading,
    isValidating,
    error,
    summary: data,
    mutate,
  }
}