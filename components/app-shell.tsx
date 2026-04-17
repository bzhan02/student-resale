"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { BottomNav } from "./bottom-nav"
import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isFullscreenPage = pathname.startsWith("/items/") || pathname.startsWith("/chat/")

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      {!isFullscreenPage && <Header />}
      <main className={isFullscreenPage ? "" : "pb-20"}>{children}</main>
      {!isFullscreenPage && <BottomNav />}
    </div>
  )
}
