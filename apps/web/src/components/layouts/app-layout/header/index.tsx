
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="py-8 flex items-center justify-between border-b mb-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center">
        <SignedIn>
          <UserButton showName />
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
  )
}

export default Header
