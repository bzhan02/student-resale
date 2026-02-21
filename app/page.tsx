"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { categories } from "@/lib/mock-data"
import { searchItems } from "@/lib/mock-data"
import { ItemCard } from "@/components/item-card"
import { CategoryIcon } from "@/components/category-icon"

export default function HomePage() {
  const searchParams = useSearchParams()
  const { items } = useAppStore()
  const query = searchParams.get("q") || ""

  const displayItems = useMemo(() => {
    if (query) {
      return searchItems(query)
    }
    return items
  }, [query, items])

  return (
    <div className="px-4 py-4">
      {/* Categories horizontal scroll */}
      {!query && (
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              分类浏览
            </h2>
            <Link
              href="/categories"
              className="flex items-center gap-0.5 text-xs text-primary"
            >
              查看全部
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex justify-center"
              >
                <CategoryIcon icon={cat.icon} name={cat.name} size="md" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Items grid */}
      <section>
        <div className="mb-3 flex items-center gap-1.5">
          {query ? (
            <h2 className="text-base font-semibold text-foreground">
              {"搜索结果: \""}{query}{"\""}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({displayItems.length} 件)
              </span>
            </h2>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                推荐好物
              </h2>
            </>
          )}
        </div>

        {displayItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-muted-foreground">
              {"没有找到相关商品，换个关键词试试吧"}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
