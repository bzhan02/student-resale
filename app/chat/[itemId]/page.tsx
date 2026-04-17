"use client"

import { use, useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Send, ImagePlus, MoreHorizontal } from "lucide-react"
import { getItemById, getInitialMessages, currentUser } from "@/lib/mock-data"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ChatPage({
  params,
}: {
  params: Promise<{ itemId: string }>
}) {
  const { itemId } = use(params)
  const item = getItemById(itemId)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (item) {
      setMessages(getInitialMessages(itemId, item.seller.id))
    }
  }, [itemId, item])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

  const seller = item.seller

  function handleSend() {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate seller auto-reply after 1 second
    setTimeout(() => {
      const replies = [
        "好的，没问题！",
        "可以的，你什么时候方便？",
        "这个价格可以再商量一下~",
        "我今天下午有空，要不约一下？",
        "谢谢你的关注！有其他问题随时问~",
      ]
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: seller.id,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: false,
      }
      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-dvh flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Link
          href={`/items/${itemId}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">返回</span>
        </Link>
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {seller.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">
              {seller.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {seller.school}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Item card (compact) */}
      <Link
        href={`/items/${itemId}`}
        className="flex shrink-0 items-center gap-3 border-b border-border bg-secondary/50 px-4 py-2.5 transition-colors hover:bg-secondary"
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">
            {item.title}
          </div>
          <div className="text-sm font-semibold text-primary">
            {"$"}{item.price}
          </div>
        </div>
      </Link>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id
            return (
              <div
                key={msg.id}
                className={cn("flex items-end gap-2", isMe && "flex-row-reverse")}
              >
                {!isMe && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {seller.name.charAt(0)}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2.5",
                    isMe
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-card text-card-foreground shadow-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {msg.timestamp}
                </span>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              className="h-10 w-full rounded-full border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">发送</span>
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
