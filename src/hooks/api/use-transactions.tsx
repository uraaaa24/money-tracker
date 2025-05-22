'use client'

import { useState } from 'react'

import useSWR from 'swr'

import { useAuthHeader } from '@/hooks/use-auth-header'
import { useFetcher } from '@/hooks/use-fetcher'
import { isError } from '@/lib/type-guard'

import type { TransactionFormInferType } from '../../schemas/add-transaction'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const PREFIX = '/transactions'

const API_TRANSACTION_URL = `${API_URL}${PREFIX}`

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

// TODO: useSWRMutationを使うようにする
export const useCreateTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | Error>(null)

  const { makeAuthHeader } = useAuthHeader()

  const createTransaction = async (data: TransactionFormInferType) => {
    setIsLoading(true)
    setError(null)

    const body = {
      ...data,
      date: data.date.toISOString().split('T')[0],
    }

    try {
      const res = await fetch(API_TRANSACTION_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: await makeAuthHeader(),
      })

      if (!res.ok) {
        throw new Error('Failed to create transaction')
      }

      return res.json()
    } catch (err) {
      if (isError(err)) {
        setError(err)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createTransaction,
    isLoading,
    error,
  }
}

export const useDeleteTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | Error>(null)

  const { makeAuthHeader } = useAuthHeader()

  const deleteTransaction = async (id: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_TRANSACTION_URL}/${id}`, {
        method: 'DELETE',
        headers: await makeAuthHeader(),
      })

      if (!res.ok) {
        throw new Error('Failed to delete transaction')
      }

      return res.json()
    } catch (err) {
      if (isError(err)) {
        setError(err)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteTransaction,
    isLoading,
    error,
  }
}

export const useUpdateTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | Error>(null)

  const { makeAuthHeader } = useAuthHeader()

  const updateTransaction = async (id: number, data: TransactionFormInferType) => {
    setIsLoading(true)
    setError(null)

    const body = {
      ...data,
      date: data.date.toISOString().split('T')[0],
    }

    try {
      const res = await fetch(`${API_TRANSACTION_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: await makeAuthHeader(),
      })

      if (!res.ok) {
        throw new Error('Failed to update transaction')
      }

      return res.json()
    } catch (err) {
      if (isError(err)) {
        setError(err)
      } else {
        setError(new Error('An unknown error occurred'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateTransaction,
    isLoading,
    error,
  }
}
