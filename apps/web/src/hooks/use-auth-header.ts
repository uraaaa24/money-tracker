'use client'

import { useAuth } from '@clerk/nextjs'

type AuthHeader = Record<string, string>;

export const useAuthHeader = () => {
  const { getToken } = useAuth();

  const makeAuthHeader = async (): Promise<AuthHeader> => {
    const template = process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE_NAME;
    const token = await getToken({ template });

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
