"use client"

import { use, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { getCategoryBySlug, getItemsByCategory } from "@/lib/mock-data"
import { ItemCard } from "@/components/item-card"
import { EmptyState } from "@/components/empty-state"
import { PackageOpen } from "lucide-react"

type SortOption = "newest" | "price-asc" | "price-desc"

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const category = getCategoryBySlug(slug)
  const allItems = getItemsByCategory(slug)
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [showFilters, setShowFilters] = useState(false)

  const sortedItems = useMemo(() => {
    const sorted = [...allItems]
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      case "newest":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }
  }, [allItems, sortBy])

  if (!category) {
    return (
      <div className="px-4 py-6">
        <p className="text-muted-foreground">分类不存在</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-4">
      {/* Back nav + title */}
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/categories"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-foreground transition-colors hover:bg-border"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">返回分类</span>
        </Link>
        <h1 className="text-lg font-bold text-foreground">{category.name}</h1>
        <span className="text-sm text-muted-foreground">
          ({sortedItems.length} 件)
        </span>
      </div>

      {/* Sort/filter bar */}
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          筛选
        </button>
        {(["newest", "price-asc", "price-desc"] as SortOption[]).map(
          (option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSortBy(option)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                sortBy === option
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {option === "newest" && "最新"}
              {option === "price-asc" && "价格低到高"}
              {option === "price-desc" && "价格高到低"}
            </button>
          )
        )}
      </div>

      {/* Items grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PackageOpen}
          title="暂无商品"
          description="这个分类下还没有商品，去其他分类看看吧"
        />
      )}
    </div>
  )
}
