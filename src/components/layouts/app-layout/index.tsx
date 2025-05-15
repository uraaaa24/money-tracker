import type { ReactNode } from 'react'

import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { LogIn } from 'lucide-react'

import { Button } from '@/components/ui/button'

type AppLayoutProps = {
  title: string
  children: ReactNode
}

const AppLayout = ({ title, children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen text-foreground">
      <header className="px-8 py-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SignInButton mode="modal">
                    <Button size="icon" variant="ghost" className="cursor-pointer">
                      <LogIn size={18} />
                    </Button>
                  </SignInButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SignedOut>
        </div>
      </header>

      <main className="px-10">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
