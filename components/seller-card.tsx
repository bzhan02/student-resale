import { Star, MapPin } from "lucide-react"
import type { User } from "@/lib/types"

export function SellerCard({
  seller,
  location,
}: {
  seller: User
  location: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
        {seller.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-card-foreground">{seller.name}</span>
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium">{seller.rating}</span>
          </div>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {seller.school}
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      </div>
      <div className="text-right text-xs text-muted-foreground">
        <div>
          {"已发布 "}{seller.itemsCount}{" 件"}
        </div>
      </div>
    </div>
  )
}
