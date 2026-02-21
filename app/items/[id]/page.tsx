"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MessageSquare,
  Share2,
  Eye,
  Clock,
  MapPin,
  Truck,
} from "lucide-react"
import { getItemById } from "@/lib/mock-data"
import { ConditionBadge } from "@/components/condition-badge"
import { SellerCard } from "@/components/seller-card"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const item = getItemById(id)
  const { toggleFavorite, isFavorited } = useAppStore()

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <p className="text-muted-foreground">商品不存在或已下架</p>
        <Link href="/" className="mt-4 text-sm text-primary">
          返回首页
        </Link>
      </div>
    )
  }

  const favorited = isFavorited(item.id)
  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  function handleContact() {
    toast.success("已复制卖家联系方式", {
      description: "请通过微信联系卖家",
    })
  }

  function handleShare() {
    toast.success("链接已复制到剪贴板")
  }

  return (
    <div className="pb-24">
      {/* Top navigation */}
      <div className="absolute left-4 top-3 z-30 flex gap-2">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">返回</span>
        </Link>
      </div>
      <div className="absolute right-4 top-3 z-30">
        <button
          type="button"
          onClick={handleShare}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">分享</span>
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Price section */}
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-primary">
            {"$"}{item.price}
          </span>
          {item.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {"$"}{item.originalPrice}
              </span>
              <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                {"-"}{discount}%
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-3 text-lg font-semibold leading-snug text-foreground text-balance">
          {item.title}
        </h1>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ConditionBadge condition={item.condition} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span>{item.viewCount} 次浏览</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{item.createdAt}</span>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-4 flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="text-[10px] text-muted-foreground">交易地点</div>
              <div className="text-xs font-medium text-secondary-foreground">
                {item.location}
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
            <Truck className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="text-[10px] text-muted-foreground">交易方式</div>
              <div className="text-xs font-medium text-secondary-foreground">
                {item.deliveryMethod}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-foreground">
            商品描述
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>

        {/* Seller */}
        <div className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-foreground">
            卖家信息
          </h2>
          <SellerCard seller={item.seller} location={item.location} />
        </div>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-2.5">
          {/* Left side: secondary icon buttons */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={handleContact}
              className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-accent"
            >
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">留言</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toggleFavorite(item.id)
                toast(favorited ? "已取消收藏" : "已收藏", {
                  description: favorited ? "已从收藏列表移除" : "可在收藏页查看",
                })
              }}
              className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-accent"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  favorited
                    ? "fill-destructive text-destructive"
                    : "text-muted-foreground"
                )}
              />
              <span className={cn(
                "text-[10px] font-medium",
                favorited ? "text-destructive" : "text-muted-foreground"
              )}>
                {favorited ? "已收藏" : "收藏"}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px shrink-0 bg-border" />

          {/* Right side: primary CTA buttons */}
          <div className="flex flex-1 items-center gap-2">
            <Button
              onClick={handleContact}
              variant="outline"
              className="flex-1 rounded-full border-primary text-primary hover:bg-primary/5 hover:text-primary"
              size="lg"
            >
              <MessageCircle className="h-4 w-4" />
              聊一聊
            </Button>
            <Button
              onClick={() => {
                toast.success("已向卖家发送购买请求", {
                  description: "卖家确认后将通知你",
                })
              }}
              className="flex-1 rounded-full"
              size="lg"
            >
              我要了
            </Button>
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
