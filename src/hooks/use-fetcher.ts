import { useAuthHeader } from "./use-auth-header"

export const useFetcher = () => {
  const { makeAuthHeader } = useAuthHeader()

  const fetcher = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    return res.json()
  }

  const authFetcher = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
        ...await makeAuthHeader(),
      },
    })
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  }

  return { fetcher, authFetcher }

}
