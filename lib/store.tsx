"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { Item } from "./types"
import { items as initialItems } from "./mock-data"

interface AppState {
  items: Item[]
  favoriteIds: Set<string>
  searchQuery: string
  toggleFavorite: (itemId: string) => void
  setSearchQuery: (query: string) => void
  isFavorited: (itemId: string) => boolean
  getFavoriteItems: () => Item[]
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [items] = useState<Item[]>(initialItems)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(initialItems.filter((i) => i.isFavorited).map((i) => i.id))
  )
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFavorite = useCallback((itemId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  const isFavorited = useCallback(
    (itemId: string) => favoriteIds.has(itemId),
    [favoriteIds]
  )

  const getFavoriteItems = useCallback(
    () => items.filter((item) => favoriteIds.has(item.id)),
    [items, favoriteIds]
  )

  return (
    <AppContext.Provider
      value={{
        items,
        favoriteIds,
        searchQuery,
        toggleFavorite,
        setSearchQuery,
        isFavorited,
        getFavoriteItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider")
  }
  return context
}
