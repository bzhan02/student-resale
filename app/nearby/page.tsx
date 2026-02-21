"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, ChevronDown, ArrowUpDown, Clock } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { categories } from "@/lib/mock-data"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

const distanceOptions = ["<1km", "<3km", "同城", "不限"]
const categoryOptions = ["全部", ...categories.map((c) => c.name)]
const priceOptions = ["默认", "价格从低到高", "价格从高到低"]

type FilterKey = "distance" | "category" | "price" | "latest"

export default function NearbyPage() {
  const { items } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null)
  const [selectedDistance, setSelectedDistance] = useState("不限")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedPrice, setSelectedPrice] = useState("默认")
  const [latestFirst, setLatestFirst] = useState(false)

  function toggleFilter(key: FilterKey) {
    if (key === "latest") {
      setLatestFirst((prev) => !prev)
      setOpenFilter(null)
      return
    }
    setOpenFilter(openFilter === key ? null : key)
  }

  const displayItems = useMemo(() => {
    let filtered = [...items]

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
    }

    // distance filter
    if (selectedDistance !== "不限") {
      filtered = filtered.filter((item) => {
        if (!item.distance) return false
        const num = parseFloat(item.distance)
        const isKm = item.distance.includes("km")
        const meters = isKm ? num * 1000 : num
        if (selectedDistance === "<1km") return meters < 1000
        if (selectedDistance === "<3km") return meters < 3000
        return true // 同城 shows all
      })
    }

    // category filter
    if (selectedCategory !== "全部") {
      const cat = categories.find((c) => c.name === selectedCategory)
      if (cat) {
        filtered = filtered.filter((item) => item.category === cat.slug)
      }
    }

    // price sort
    if (selectedPrice === "价格从低到高") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (selectedPrice === "价格从高到低") {
      filtered.sort((a, b) => b.price - a.price)
    }

    // latest first
    if (latestFirst) {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return filtered
  }, [items, searchQuery, selectedDistance, selectedCategory, selectedPrice, latestFirst])

  const distanceLabel =
    selectedDistance === "不限" ? "距离" : selectedDistance
  const categoryLabel =
    selectedCategory === "全部" ? "类别" : selectedCategory
  const priceLabel =
    selectedPrice === "默认" ? "价格" : selectedPrice === "价格从低到高" ? "价格↑" : "价格↓"

  return (
    <div className="flex flex-col">
      {/* Search bar */}
      <div className="px-4 pt-4 pb-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="搜索附近好物..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-full border border-input bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </form>
      </div>

      {/* Filter chips bar */}
      <div className="relative px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {/* Distance chip */}
          <button
            type="button"
            onClick={() => toggleFilter("distance")}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              openFilter === "distance" || selectedDistance !== "不限"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground"
            )}
          >
            <MapPin className="h-3 w-3" />
            {distanceLabel}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                openFilter === "distance" && "rotate-180"
              )}
            />
          </button>

          {/* Category chip */}
          <button
            type="button"
            onClick={() => toggleFilter("category")}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              openFilter === "category" || selectedCategory !== "全部"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground"
            )}
          >
            {categoryLabel}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                openFilter === "category" && "rotate-180"
              )}
            />
          </button>

          {/* Price chip */}
          <button
            type="button"
            onClick={() => toggleFilter("price")}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              openFilter === "price" || selectedPrice !== "默认"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground"
            )}
          >
            {priceLabel}
            <ArrowUpDown className="h-3 w-3" />
          </button>

          {/* Latest chip */}
          <button
            type="button"
            onClick={() => toggleFilter("latest")}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              latestFirst
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground"
            )}
          >
            <Clock className="h-3 w-3" />
            {"最新发布"}
          </button>
        </div>

        {/* Dropdown panels */}
        {openFilter === "distance" && (
          <DropdownPanel
            options={distanceOptions}
            selected={selectedDistance}
            onSelect={(v) => {
              setSelectedDistance(v)
              setOpenFilter(null)
            }}
          />
        )}
        {openFilter === "category" && (
          <DropdownPanel
            options={categoryOptions}
            selected={selectedCategory}
            onSelect={(v) => {
              setSelectedCategory(v)
              setOpenFilter(null)
            }}
          />
        )}
        {openFilter === "price" && (
          <DropdownPanel
            options={priceOptions}
            selected={selectedPrice}
            onSelect={(v) => {
              setSelectedPrice(v)
              setOpenFilter(null)
            }}
          />
        )}
      </div>

      {/* Location indicator */}
      <div className="flex items-center gap-1.5 px-4 pb-3">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs text-muted-foreground">
          {"当前位置: Stanford University 附近"}
        </span>
      </div>

      {/* Items grid */}
      <div className="px-4 pb-4">
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item) => (
              <ItemCard key={item.id} item={item} showDistance />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-foreground">
              {"附近暂无相关商品"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {"试试扩大搜索范围或更换筛选条件"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function DropdownPanel({
  options,
  selected,
  onSelect,
}: {
  options: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="absolute left-4 right-4 top-full z-30 mt-1 rounded-xl border border-border bg-card p-2 shadow-lg">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selected === opt
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
