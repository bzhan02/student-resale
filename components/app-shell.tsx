"use client"

import { Header } from "./header"
import { BottomNav } from "./bottom-nav"
import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-background">
      <Header />
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  )
}
