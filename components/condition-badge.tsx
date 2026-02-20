import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ItemCondition } from "@/lib/types"

const conditionStyles: Record<ItemCondition, string> = {
  "全新": "bg-primary text-primary-foreground border-transparent",
  "几乎全新": "bg-primary/80 text-primary-foreground border-transparent",
  "轻微使用": "bg-secondary text-secondary-foreground border-transparent",
  "明显使用": "bg-muted text-muted-foreground border-transparent",
}

export function ConditionBadge({ condition }: { condition: ItemCondition }) {
  return (
    <Badge
      variant="default"
      className={cn("text-[10px] px-1.5 py-0.5 rounded-md", conditionStyles[condition])}
    >
      {condition}
    </Badge>
  )
}
