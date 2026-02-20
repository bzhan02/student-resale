import {
  BookOpen,
  Laptop,
  Armchair,
  Shirt,
  Bike,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Laptop,
  Armchair,
  Shirt,
  Bike,
  MoreHorizontal,
}

interface CategoryIconProps {
  icon: string
  name: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
}

const iconSizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7",
}

export function CategoryIcon({
  icon,
  name,
  className,
  size = "md",
}: CategoryIconProps) {
  const Icon = iconMap[icon] || MoreHorizontal

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-accent text-primary transition-colors",
          sizeClasses[size]
        )}
      >
        <Icon className={iconSizeClasses[size]} />
      </div>
      <span className="text-xs font-medium text-foreground">{name}</span>
    </div>
  )
}
