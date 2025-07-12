import type { ReactNode } from 'react'

import Header from './header'

type AppLayoutProps = {
  title: string
  children: ReactNode
}


const AppLayout = ({ title, children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen text-foreground px-20">
      <Header title={title} />
      <main>{children}</main>
    </div>
  )
}

export default AppLayout
