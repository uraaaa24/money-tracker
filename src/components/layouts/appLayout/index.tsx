import type { ReactNode } from 'react'

type AppLayoutProps = {
  title: string
  children: ReactNode
}

const AppLayout = ({ title, children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen text-foreground">
      <header className="px-8 py-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </header>

      <main className="px-10">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
