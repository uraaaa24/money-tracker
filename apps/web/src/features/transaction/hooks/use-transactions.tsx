'use client'

import useSWR from 'swr'

import { useApiMutation, HttpMethod } from '@/hooks/use-api-mutation'
import { useFetcher } from '@/hooks/use-fetcher'
import { env } from '@/lib/env'

import type { TransactionFormInferType } from '../schemas/add-transaction'
import type {
  CreateTransactionRequestBody,
  PutTransactionRequestBody,
} from '../types/transactions.api'

const API_TRANSACTION_URL = `${env.NEXT_PUBLIC_API_URL}/transactions`

export const useGetTransactions = () => {
  const { authFetcher } = useFetcher()

  const { data, isLoading, isValidating, error, mutate } = useSWR(API_TRANSACTION_URL, authFetcher)

  return {
    isLoading,
    isValidating,
    error,
    transactions: data,
    mutate,
  }
}

export const useCreateTransaction = () => {
  const { trigger, isLoading, error } = useApiMutation<
    CreateTransactionRequestBody,
    TransactionFormInferType,
    CreateTransactionRequestBody
  >(API_TRANSACTION_URL, HttpMethod.POST, {
    prepareBody: (data: TransactionFormInferType): CreateTransactionRequestBody => ({
      type: data.type,
      date: data.date.toISOString().split('T')[0],
      category_id: Number(data.categoryId),
      amount: Number(data.amount),
      memo: data.memo ?? '',
    }),
  })

  return {
    createTransaction: trigger,
    isLoading,
    error,
  }
}

export const useDeleteTransaction = () => {
  const { trigger, isLoading, error } = useApiMutation<
    boolean,
    number
  >(API_TRANSACTION_URL, HttpMethod.DELETE, {
    buildUrl: (base, id) => `${base}/${id}`,
  })

  return {
    deleteTransaction: trigger,
    isLoading,
    error,
  }
}

type UpdateTransactionArg = {
  id: number
  data: TransactionFormInferType
}

export const useUpdateTransaction = () => {
  const { trigger, isLoading, error } = useApiMutation<
    PutTransactionRequestBody,
    UpdateTransactionArg,
    PutTransactionRequestBody
  >(API_TRANSACTION_URL, HttpMethod.PUT, {
    buildUrl: (base, { id }) => `${base}/${id}`,
    prepareBody: ({ data }): PutTransactionRequestBody => ({
      type: data.type,
      date: data.date.toISOString().split('T')[0],
      category_id: Number(data.categoryId),
      amount: Number(data.amount),
      memo: data.memo ?? '',
    }),
  })

  return {
    updateTransaction: trigger,
    isLoading,
    error,
  }
}
