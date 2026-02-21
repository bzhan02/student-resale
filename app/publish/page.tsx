"use client"

import { useState } from "react"
import { Camera, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/lib/mock-data"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { ItemCondition, DeliveryMethod } from "@/lib/types"

export default function PublishPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState<ItemCondition | "">("")
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | "">("")
  const [location, setLocation] = useState("")

  function handleAddImage() {
    // Simulate image upload with a placeholder color
    const colors = [
      "bg-primary/20",
      "bg-accent",
      "bg-secondary",
      "bg-muted",
    ]
    if (images.length < 6) {
      setImages([...images, colors[images.length % colors.length]])
    }
  }

  function handleRemoveImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !price || !category || !condition) {
      toast.error("请填写必填项", {
        description: "标题、价格、分类和新旧程度为必填",
      })
      return
    }
    toast.success("发布成功！", {
      description: "你的商品已成功发布",
    })
    router.push("/")
  }

  return (
    <div className="px-4 py-4">
      <h1 className="mb-5 text-xl font-bold text-foreground">发布闲置</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Image upload */}
        <div>
          <Label className="mb-2 text-foreground">商品图片</Label>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {images.map((color, index) => (
              <div
                key={index}
                className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg ${color} border border-border`}
              >
                <span className="text-xs text-muted-foreground">
                  图片 {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-primary-foreground shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <button
                type="button"
                onClick={handleAddImage}
                className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Camera className="h-5 w-5" />
                <span className="text-[10px]">
                  {images.length}/6
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-foreground">
            标题 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="请输入商品标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5"
            maxLength={50}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {title.length}/50
          </p>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-foreground">
            描述
          </Label>
          <Textarea
            id="description"
            placeholder="描述商品的详细信息、使用状况等..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1.5 min-h-24"
            maxLength={500}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {description.length}/500
          </p>
        </div>

        {/* Price row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="price" className="text-foreground">
              售价 ($) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1.5"
              min={0}
            />
          </div>
          <div>
            <Label htmlFor="originalPrice" className="text-foreground">
              原价 ($)
            </Label>
            <Input
              id="originalPrice"
              type="number"
              placeholder="0"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-1.5"
              min={0}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-foreground">
            分类 <span className="text-destructive">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue placeholder="请选择分类" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div>
          <Label className="text-foreground">
            新旧程度 <span className="text-destructive">*</span>
          </Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              ["全新", "仅拆封", "轻微使用", "明显使用"] as ItemCondition[]
            ).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  condition === c
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery method */}
        <div>
          <Label className="text-foreground">交易方式</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["自取", "邮寄", "均可"] as DeliveryMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDeliveryMethod(m)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  deliveryMethod === m
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-foreground">
            所在地
          </Label>
          <Input
            id="location"
            placeholder="例如: Los Angeles, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1.5"
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="mt-2 w-full rounded-full" size="lg">
          发布商品
        </Button>
      </form>
    </div>
  )
}
