"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAppStore } from "@/lib/store"

export function SearchBar() {
  const router = useRouter()
  const { searchQuery, setSearchQuery } = useAppStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSearchQuery(localQuery)
    if (localQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(localQuery.trim())}`)
    } else {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="搜索二手好物..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="h-9 w-full rounded-full border border-input bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </form>
  )
}
