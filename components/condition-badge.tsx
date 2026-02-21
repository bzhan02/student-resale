import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ItemCondition } from "@/lib/types"

const conditionStyles: Record<ItemCondition, string> = {
  "全新": "bg-orange-500 text-white border-transparent",
  "仅拆封": "bg-blue-500 text-white border-transparent",
  "轻微使用": "bg-green-100 text-green-800 border-transparent",
  "明显使用": "bg-gray-200 text-gray-600 border-transparent",
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
