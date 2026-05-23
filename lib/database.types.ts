export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ItemCondition = "全新" | "仅拆封" | "轻微使用" | "明显使用"
export type DeliveryMethod = "自取" | "邮寄" | "均可"
export type CategorySlug = "textbooks" | "electronics" | "furniture" | "clothing" | "transport"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          school: string
          rating: number
          items_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          avatar_url?: string | null
          school?: string
          rating?: number
          items_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          avatar_url?: string | null
          school?: string
          rating?: number
          items_count?: number
          updated_at?: string
        }
      }
      items: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string
          price: number
          original_price: number | null
          images: string[]
          category: CategorySlug
          condition: ItemCondition
          delivery_method: DeliveryMethod
          location: string
          view_count: number
          is_sold: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description?: string
          price: number
          original_price?: number | null
          images?: string[]
          category: CategorySlug
          condition: ItemCondition
          delivery_method?: DeliveryMethod
          location?: string
          view_count?: number
          is_sold?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          price?: number
          original_price?: number | null
          images?: string[]
          category?: CategorySlug
          condition?: ItemCondition
          delivery_method?: DeliveryMethod
          location?: string
          view_count?: number
          is_sold?: boolean
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          user_id: string
          item_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          item_id: string
          created_at?: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      item_condition: ItemCondition
      delivery_method: DeliveryMethod
      category_slug: CategorySlug
    }
  }
}
