"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { ItemCard } from "@/components/item-card"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const { getFavoriteItems } = useAppStore()
  const favorites = getFavoriteItems()

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">我的收藏</h1>
        {favorites.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {favorites.length} 件商品
          </span>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {favorites.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="还没有收藏"
          description="浏览商品时点击心形图标即可收藏"
        >
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              去逛逛
            </Button>
          </Link>
        </EmptyState>
      )}
    </div>
  )
}
