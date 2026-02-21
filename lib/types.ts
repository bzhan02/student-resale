export type ItemCondition = "全新" | "仅拆封" | "轻微使用" | "明显使用"

export type DeliveryMethod = "自取" | "邮寄" | "均可"

export type CategorySlug =
  | "textbooks"
  | "electronics"
  | "furniture"
  | "clothing"
  | "transport"

export interface Category {
  slug: CategorySlug
  name: string
  icon: string
  count: number
}

export interface User {
  id: string
  name: string
  avatar: string
  school: string
  rating: number
  itemsCount: number
  joinedDate: string
}

export interface Item {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: CategorySlug
  condition: ItemCondition
  deliveryMethod: DeliveryMethod
  seller: User
  location: string
  createdAt: string
  isFavorited: boolean
  viewCount: number
}
