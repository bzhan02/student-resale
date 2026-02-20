"use client"

import {
  Star,
  Package,
  ShoppingBag,
  Heart,
  Settings,
  ChevronRight,
  Info,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { currentUser } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"

const menuItems = [
  {
    icon: Package,
    label: "我的发布",
    description: "管理已发布的商品",
    href: "#",
  },
  {
    icon: ShoppingBag,
    label: "我的购买",
    description: "查看购买记录",
    href: "#",
  },
  {
    icon: Heart,
    label: "我的收藏",
    description: "浏览收藏的好物",
    href: "/favorites",
  },
  {
    icon: Settings,
    label: "账号设置",
    description: "修改个人信息",
    href: "#",
  },
  {
    icon: HelpCircle,
    label: "帮助中心",
    description: "常见问题解答",
    href: "#",
  },
  {
    icon: Info,
    label: "关于闲置帮",
    description: "版本 1.0.0",
    href: "#",
  },
]

export default function ProfilePage() {
  const { favoriteIds } = useAppStore()

  return (
    <div className="px-4 py-4">
      {/* Profile card */}
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 text-2xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{currentUser.name}</h1>
            <p className="mt-0.5 text-sm text-primary-foreground/80">
              {currentUser.school}
            </p>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-sm font-medium">{currentUser.rating}</span>
              <span className="text-xs text-primary-foreground/60">
                {" "}
                {"("}评分{")"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-primary-foreground/10 p-3 text-center">
            <div className="text-xl font-bold">{currentUser.itemsCount}</div>
            <div className="mt-0.5 text-xs text-primary-foreground/70">
              已发布
            </div>
          </div>
          <div className="rounded-xl bg-primary-foreground/10 p-3 text-center">
            <div className="text-xl font-bold">3</div>
            <div className="mt-0.5 text-xs text-primary-foreground/70">
              已售出
            </div>
          </div>
          <div className="rounded-xl bg-primary-foreground/10 p-3 text-center">
            <div className="text-xl font-bold">{favoriteIds.size}</div>
            <div className="mt-0.5 text-xs text-primary-foreground/70">
              收藏
            </div>
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-accent ${
                index > 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-card-foreground">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
          )
        })}
      </div>

      {/* Logout */}
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5"
      >
        <LogOut className="h-4 w-4" />
        退出登录
      </button>

      {/* Version info */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {"闲置帮 v1.0.0 | 专为留学生打造"}
      </p>
    </div>
  )
}
