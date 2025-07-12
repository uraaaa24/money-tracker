import { mutate as globalMutate } from 'swr'
import useSWRMutation from 'swr/mutation'

import { useAuthHeader } from '@/hooks/use-auth-header'


export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const
export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod]

interface MutationOptions<TData, TArg, TBody = TArg> {
  /** 成功時にキャッシュへ反映（楽観的 UI） */
  onSuccess?: (data: TData, arg: TArg) => void
  /** 失敗時フック */
  onError?: (err: Error) => void
  /** revalidate の有無 (デフォルト true) */
  revalidate?: boolean
  /** URL を動的に組み立てたい場合 */
  buildUrl?: (base: string, arg: TArg) => string
  /** リクエストボディを動的に組み立てたい場合 */
  prepareBody?: (arg: TArg) => TBody
}

/**
 * 認証付き汎用ミューテーション
 */
export const useApiMutation = <
  TData = unknown,
  TArg = unknown,
  TBody = TArg
>(
  baseUrl: string,
  method: HttpMethod,
  opts: MutationOptions<TData, TArg, TBody> = {},
) => {
  const { makeAuthHeader } = useAuthHeader()

  const apiRequest = async (url: string, { arg }: { arg: TArg }): Promise<TData> => {
    const target = opts.buildUrl ? opts.buildUrl(url, arg) : url

    const headers = {
      ...await makeAuthHeader(),
      'Content-Type': 'application/json',
    }

    const body = opts.prepareBody ? opts.prepareBody(arg) : arg

    const res = await fetch(target, {
      method,
      headers,
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Failed to ${method} ${target}`)
    return res.status === 204 ? (null as TData) : res.json()
  }

  const { trigger, isMutating, error } = useSWRMutation<
    TData,
    Error,
    string,
    TArg
  >(baseUrl, apiRequest, {
    onSuccess: (data, key, config) => {
      const arg = (config as { arg?: TArg }).arg
      if (opts.onSuccess && arg !== undefined) opts.onSuccess(data, arg)
      if (opts.revalidate ?? true) globalMutate(key)
    },
    onError: opts.onError,
  })

  return {
    trigger,
    isLoading: isMutating,
    error,
  }
}
