"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { BottomNav } from "./bottom-nav"
import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isItemDetail = pathname.startsWith("/items/")

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      {!isItemDetail && <Header />}
      <main className={isItemDetail ? "" : "pb-20"}>{children}</main>
      {!isItemDetail && <BottomNav />}
    </div>
  )
}
