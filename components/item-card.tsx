"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { ConditionBadge } from "./condition-badge"
import type { Item } from "@/lib/types"

export function ItemCard({ item }: { item: Item }) {
  const { toggleFavorite, isFavorited } = useAppStore()
  const favorited = isFavorited(item.id)

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/items/${item.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute left-2 top-2">
            <ConditionBadge condition={item.condition} />
          </div>
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/items/${item.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-card-foreground">
            {item.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-end justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary">
              {"$"}{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {"$"}{item.originalPrice}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(item.id)
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent"
            aria-label={favorited ? "取消收藏" : "收藏"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                favorited
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              )}
            />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
            {item.seller.name.charAt(0)}
          </div>
          <span className="text-xs text-muted-foreground">
            {item.seller.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {"·"}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.seller.school}
          </span>
        </div>
      </div>
    </div>
  )
}
