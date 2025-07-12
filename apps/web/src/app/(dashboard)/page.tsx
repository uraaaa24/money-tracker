import AppLayout from '@/components/layouts/app-layout'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
}

export default async function Home() {
  return <AppLayout title="Dashboard">Hello World!</AppLayout>
}
