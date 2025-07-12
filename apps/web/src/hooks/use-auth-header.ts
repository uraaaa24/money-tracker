'use client'

import { useAuth } from '@clerk/nextjs'

import { env } from '@/lib/env'

type AuthHeader = Record<string, string>;

export const useAuthHeader = () => {
  const { getToken } = useAuth();

  const makeAuthHeader = async (): Promise<AuthHeader> => {
    const template = env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE_NAME;
    const token = await getToken(template ? { template } : undefined);

    if (!token) {
      console.error("Clerk token fetch failed");
      return { 'Content-Type': 'application/json' };
    }

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  return { makeAuthHeader };
};
