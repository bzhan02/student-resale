"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { SearchBar } from "./search-bar"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">闲</span>
          </div>
          <span className="text-base font-bold text-foreground">闲置帮</span>
        </Link>
        <div className="flex-1">
          <SearchBar />
        </div>
        <button
          type="button"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">通知</span>
        </button>
      </div>
    </header>
  )
}
