'use client'

import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navItems } from '@/constants/nav-items'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathName = usePathname()
  const isActive = (path: string) => path === pathName

  return (
    <aside className="h-screen w-64 border-r bg-white px-6 py-8">
      <div className="flex items-center justify-between mb-6 h-10 px-2">
        <div className="text-xl font-bold leading-none flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-500" />
          Money Tracker
        </div>
      </div>

      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex w-full items-center gap-2 p-3 rounded-md hover:bg-gray-100 text-sm font-medium',
              isActive(item.href) && 'bg-gray-100',
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
